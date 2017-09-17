/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hireds              ->  index
 * POST    /api/hireds              ->  create
 * GET     /api/hireds/:id          ->  show
 * PUT     /api/hireds/:id          ->  upsert
 * PATCH   /api/hireds/:id          ->  patch
 * DELETE  /api/hireds/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Hired from './hired.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Hireds
export function index(req, res) {
  if(req.query.page && req.query.limit) {
    var page = Number(req.query.page);
    var limit = Number(req.query.limit);
    return Hired.find({}, '-salt -password').skip(page*limit).limit(limit).exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
  } else {
  return Hired.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
}

// Gets a single Hired from the DB
export function show(req, res) {
  return Hired.findById(req.params.id).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function filterByUserId(req, res) {
  return Hired.find({'postedBy._id': req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets Hired for user from the DB
export function countForUser(req, res) {
  return Hired.count({'postedBy._id': req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Hired in the DB
export function create(req, res) {
  return Hired.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Hired in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Hired.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Upserts the given user object to Hired in the DB at the specified ID
export function addApplied(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Hired.findOneAndUpdate({
    _id: req.params.id }, {
      $addToSet: { appliedBy: req.body }
    },
    {
      new: true,
      setDefaultsOnInsert: true,
      returnOriginal: false,
      runValidators: true
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Upserts the given user object to Hired in the DB at the specified ID
export function confirmApplied(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Hired.findOneAndUpdate({
    _id: req.params.id }, {
      $set: { closeApplied: req.body }
    },
    {
      new: true,
      setDefaultsOnInsert: true,
      returnOriginal: false,
      runValidators: true
    })
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Hired in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Hired.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Hired from the DB
export function destroy(req, res) {
  return Hired.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
// search Hired field from the DB
export function search(req, res) {
  let query = {};
  query['$or'] = [];
  var obj   = req.body;
  Object.keys(obj).forEach(key => {
    let temp = {};
    temp[key] = new RegExp(obj[key], 'i');
    query['$or'].push(temp);
  });
  //console.log(query);
  return Hired.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

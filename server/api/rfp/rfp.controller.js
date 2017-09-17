/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rfps              ->  index
 * POST    /api/rfps              ->  create
 * GET     /api/rfps/:id          ->  show
 * PUT     /api/rfps/:id          ->  upsert
 * PATCH   /api/rfps/:id          ->  patch
 * DELETE  /api/rfps/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Rfp from './rfp.model';

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

// Gets a list of Rfps
export function index(req, res) {
  return Rfp.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Rfp from the DB
export function show(req, res) {
  return Rfp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Rfp in the DB
export function create(req, res) {
  return Rfp.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Rfp in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Rfp.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Rfp in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Rfp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Rfp from the DB
export function destroy(req, res) {
  return Rfp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Upserts the given user object to Hired in the DB at the specified ID
export function addApplied(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Rfp.findOneAndUpdate({
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

// Gets Rfp for user from the DB
export function countForUser(req, res) {
  return Rfp.count({'postedBy._id': req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Upserts the given user object to Hired in the DB at the specified ID
export function addInterest(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Rfp.findOneAndUpdate({
      _id: req.params.id }, {
      $addToSet: { interests: req.body }
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
  return Rfp.findOneAndUpdate({
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

// Gets a single Hired for the user from the DB
export function filterByUserId(req, res) {
  return Rfp.find({ appliedBy: {
    $elemMatch: {
      userId: req.params.id
    }
  } }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

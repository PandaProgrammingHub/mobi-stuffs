/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/companies              ->  index
 * POST    /api/companies              ->  create
 * GET     /api/companies/:id          ->  show
 * PUT     /api/companies/:id          ->  upsert
 * PATCH   /api/companies/:id          ->  patch
 * DELETE  /api/companies/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Companies from './companies.model';

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

// Gets a list of Companiess
export function index(req, res) {
  if(req.query.page && req.query.limit) {
    var page = Number(req.query.page);
    var limit = Number(req.query.limit);
    return Companies.find({}, '-salt -password').skip(page*limit).limit(limit).exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
  } else {
  return Companies.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
}

// Gets a single Companies from the DB
export function show(req, res) {
  return Companies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Companies in the DB
export function create(req, res) {
  return Companies.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Companies in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Companies.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Companies in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Companies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Companies from the DB
export function destroy(req, res) {
  return Companies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// get documents based on user followed
export function getFollowedCompanies(req, res) {
  return Companies.find({_id: { $in: req.body.comArr } }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

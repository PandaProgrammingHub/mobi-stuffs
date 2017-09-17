/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/recommendations              ->  index
 * POST    /api/recommendations              ->  create
 * GET     /api/recommendations/:id          ->  show
 * PUT     /api/recommendations/:id          ->  upsert
 * PATCH   /api/recommendations/:id          ->  patch
 * DELETE  /api/recommendations/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import recommendations from './recommendations.model';
import user from '../user/user.model';

const {ObjectId} = require('mongodb'); // or ObjectID

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

function getRecommendedByUserData(recData) {
  return new Promise((resolve, reject) => {
    // do a thing, possibly async, then…
    for(let i = 0; i < recData.length; i++) {
      user.findById(recData[i].recommendedBy)
        .lean()
        .exec()
        .then(userData => {
          recData[i].recByUserDetails = userData;
          if(i == recData.length - 1) {
            return resolve(recData);
          }
        })
        .catch(err => reject(Error(err)));
    }
  });
}

// Gets a list of recommendations
export function index(req, res) {
  return recommendations.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single recommendations from the DB
// export function show(req, res) {
//   return recommendations.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

export function show(req, res) {
  recommendations.find({recommendedTo: ObjectId(req.params.id)}).lean().exec()
  .then(recData => getRecommendedByUserData(recData))
    .then(Data => {
      return res.status(200).send(Data);
  })
  .catch(err => {
    return res.status(400).send(err);
  });
}

// Creates a new recommendations in the DB
export function create(req, res) {
  return recommendations.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given recommendations in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return recommendations.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing recommendations in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return recommendations.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a recommendations from the DB
export function destroy(req, res) {
  return recommendations.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// get documents based on user followed
export function getFollowedrecommendations(req, res) {
  return recommendations.find({_id: { $in: req.body.comArr } }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function recommendby(req, res) {
  return recommendations.find({recommendedBy: new ObjectId(req.params.id)}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

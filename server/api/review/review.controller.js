/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviews              ->  index
 * POST    /api/reviews              ->  create
 * GET     /api/reviews/:id          ->  show
 * PUT     /api/reviews/:id          ->  upsert
 * PATCH   /api/reviews/:id          ->  patch
 * DELETE  /api/reviews/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Notification from '../notification/notification.model';
import User from '../user/user.model';
import Review from './review.model';
const {ObjectId} = require('mongodb'); // or ObjectID

let notifyRecepients = require('../notification/notification.controller').notifyRecepients;

function respondWithResult(res, statusCode, cb) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      if(cb) {
        cb(true, entity);
        return;
      }
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

// Gets a list of Reviews
export function index(req, res) {
  if(req.query.page && req.query.limit) {
    var page = Number(req.query.page);
    var limit = Number(req.query.limit);
    return Review.find({}, '-salt -password').skip(page*limit).limit(limit).exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
  } else {
  return Review.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
}

// Gets a single Review from the DB
export function show(req, res) {
  return Review.find({user: new ObjectId(req.params.id)}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Review in the DB
export function create(req, res) {
  return Review.create(req.body)
    .then(respondWithResult(res, 201, (all, review) => notifyRecepients(req, res, all, review, 'post hired')))
    .catch(handleError(res));
}

// Upserts the given Review in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Review.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Review in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Review from the DB
export function destroy(req, res) {
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets Review for user from the DB
export function countForUser(req, res) {
  return Review.count({user: req.params.id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Review from the DB
export function getCompanyReview(req, res) {
  //console.log('req is =', req.params.id);
  return Review.find({'companyId': new ObjectId(req.params.id)}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// search Review field from the DB
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
  return Review.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
/**
 * On-Off Reviews Flag
 */
export function onoff(req, res) {
  var _id = req.body.id;
  var flag = req.body.flag;
  return Review.findById(_id).exec()
    .then(review => {
      review.flag = flag;
      return review.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(handleError(res));
    });
}

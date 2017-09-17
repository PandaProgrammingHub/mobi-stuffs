/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/notifications              ->  index
 * POST    /api/notifications              ->  create
 * GET     /api/notifications/:id          ->  show
 * PUT     /api/notifications/:id          ->  upsert
 * PATCH   /api/notifications/:id          ->  patch
 * DELETE  /api/notifications/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Notification from './notification.model';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    } else {
      return res.status(400).json({
        message: "Entity not matching any documents"
      });
    }
    return null;
  };
}

// Updates the given Notification in the DB at the specified ID
export function markViewed(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Notification.findOneAndUpdate(
    {_id: req.params.id, recepients: req.body.recepient }, { $addToSet: {
      viewed: [req.body.recepient]
    }}, {upsert: false, setDefaultsOnInsert: true, runValidators: true}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
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

// Gets a list of Notifications
export function index(req, res) {
  return Notification.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Notifications for user in recepients
export function getNotificationsList(req, res) {
  return Notification.find({recepients: req.params.userId}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Notification from the DB
export function show(req, res) {
  return Notification.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Notification in the DB
export function create(req, res) {
  return Notification.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Notification in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Notification.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

function getNotify(req, entity, scenario, recepients) {
  switch(scenario) {
    case 'post hired':
      return {
        "recepients": recepients,
        "message": req.user.name + " has posted a new review for " + entity.companyName,
        "viewed": []
      };
    default: {
      return {};
    }
  }
}

function setRecepients(recepients) {
  if (Array.isArray(recepients)) return recepients;
  if (recepients === true) return User.find({}).exec()
    .then(function(userList) {
      let newList;
      if (Array.isArray(userList) && (userList.length > 0)) newList = userList.map(function(user) {
        return user._id;
      });
      return newList;
    });
}

export function notifyRecepients(req, res, sentRecepients, entity, scenario) {
    setRecepients(sentRecepients)
    .then(function(recepients) {
      Notification.create(getNotify(req, entity, scenario, recepients)).then(() => {
        console.log('Review post notification created');
        res.json(review);
      }).catch(err => {
        res.json({"message": "Notification create failed"});
      });
    });
}

// Updates an existing Notification in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Notification.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Notification from the DB
export function destroy(req, res) {
  return Notification.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

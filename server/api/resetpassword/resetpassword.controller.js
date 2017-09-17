/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resetpassword              ->  index
 * POST    /api/resetpassword              ->  create
 * GET     /api/resetpassword/:id          ->  show
 * PUT     /api/resetpassword/:id          ->  upsert
 * PATCH   /api/resetpassword/:id          ->  patch
 * DELETE  /api/resetpassword/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Resetpassword from './resetpassword.model';
import * as EmailConfig from '../email/emailconfig';
import config from '../../config/environment';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Resetpasswords
export function index(req, res) {
  return Resetpassword.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Resetpassword from the DB
export function show(req, res) {
  return Resetpassword.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Resetpassword in the DB
export function create(req, res) {
  User.find({email: req.body.email}, function (err, user) {
    if (err) {
      return res.status('500').json({message: 'Please Enter Registered Mail Id', error: true})
    }
    else {
      if (user.length != 0) {
        sendMailToResetPassword(req.body.email, user);
        return res.status('200').json({message: 'Please check your email for the reset password Link.', error: false});
      } else {
        return res.status('500').json({message: 'Please Enter Registered email Id', error: true});
        // res.json(err);
      }
    }
  });
}

// Upserts the given Resetpassword in the DB at the specified ID
export function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Resetpassword.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Resetpassword in the DB
export function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Resetpassword.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Resetpassword from the DB
export function destroy(req, res) {
  return Resetpassword.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


function sendMailToResetPassword(email, user) {

  let fromEmail = 'hello@salesdoor.com';
  let toEmail = email;
  let subject = 'Reset your password';
  let description = 'We got a request to reset you salesdoor password.';
  let serverPath = config.DOMAIN + '/resetpassword?id=' + email;
  let htmlTemplate = 'Hi ' + user[0].name + ',<br><br>We got a request to reset you salesdoor password.<br><br> Please click <a href= "' + serverPath + '"> here</a> on this link.<br> <br> Salesdoor Team';
  EmailConfig.sentMail(fromEmail, toEmail, subject, description, htmlTemplate);
}


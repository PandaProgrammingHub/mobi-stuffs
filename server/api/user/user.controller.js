'use strict';

import User from './user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import * as EmailConfig from '../email/emailconfig';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  if(req.query.page && req.query.limit) {
    var page = Number(req.query.page);
    var limit = Number(req.query.limit);
    return User.find({}, '-salt -password').skip(page*limit).limit(limit).exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
  } else {
    return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
  }
}

/**
 * Creates a new user
 */
export function create(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = req.body.role ? req.body.role : 'user';
  newUser.save()
    .then(function(user) {
      sendMailAfterSignup(user.email);
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res) {
  res.redirect('/');
}

/**
 *update user Additional Information
 */
export function updateUser(req, res) {
  console.log('in updateUser' + JSON.stringify(req.body));
  return User.findOneAndUpdate({_id: req.user._id}, req.body, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
    runValidators: false
  }).then(() => res.status(204).end())
    .catch(handleError(res));
}


/**
 * Change a users password
 */
export function updatePassword(req, res) {
  var emailId = req.body.emailId;
  var newPass = String(req.body.pwd);
  return User.findOne({email: emailId}).exec()
    .then(user => {
      user.password = newPass;
      return user.save()
        .then(() => {
          res.status(204).end();
        })
        .catch(validationError(res));
    });
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}
// search User field from the DB
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
  return User.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

function sendMailAfterSignup(email) {
  let fromEmail = 'hello@salesdoor.com';
  let toEmail = email;
  let subject = 'Welcome to Salesdoor';
  let description = 'Thank you for joining Salesdoor.';
  let htmlTemplate = 'Thank you for joining our growing community.<br><br> We created Salesdoor to connect people through the experience they had during their sales cycle.';
  EmailConfig.sentMail(fromEmail, toEmail, subject, description, htmlTemplate);
}

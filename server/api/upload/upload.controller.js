/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/uploads              ->  index
 * POST    /api/uploads              ->  create
 * GET     /api/uploads/:id          ->  show
 * PUT     /api/uploads/:id          ->  upsert
 * PATCH   /api/uploads/:id          ->  patch
 * DELETE  /api/uploads/:id          ->  destroy
 */

'use strict';

var formidable = require('formidable');
import uploadConfig from './upload.config';
import Company from '../companies/companies.model';
var fs = require('fs');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

export function index(req, res) {
  return Upload.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Upload in the DB
export function create(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let file = files.file;
    fs.readFile(file.path, function (err, data) {
      uploadConfig.upload(data, 'users/' + req.user._id + '/' + file.name, function(err, result) {
        if(err) {
          let response_data = {};
          response_data.message = err;
          response_data.error = true;
          return res.json(response_data);
        } else {
          let response_data = {};
          response_data.url = result.Location;
          response_data.path = result.key;
          response_data.error = false;
          return res.status('200').json(response_data);
        }
      });
    });
  });
}


export function uploadCompany(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let file = files.file;
    fs.readFile(file.path, function (err, data) {
      uploadConfig.upload(data, 'companies/' + fields.companyID + '/' + file.name, function (err, result) {
        if (err) {
          let response_data = {};
          response_data.message = err;
          response_data.error = true;
          return res.json(response_data);
        } else {
          let response_data = {};
          response_data.url = result.Location;
          response_data.path = result.key;
          response_data.error = false;

          Company.findByIdAndUpdate({_id: fields.companyID}, {logo: result.Location}, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
            runValidators: false
          }).then(function () {
            return res.status('200').json(response_data);
          })
            .catch(handleError(res));
        }
      });
    });
  });
}

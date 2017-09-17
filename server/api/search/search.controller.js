'use strict';

import Companies from '../companies/companies.model';
import Hired from '../hired/hired.model';
import Review from '../review/review.model';
import User from '../user/user.model';
import Rfp from '../rfp/rfp.model';

let searchModel = {
  Company: Companies,
  Hired: Hired,
  Review: Review,
  User: User,
  Rfp: Rfp
};

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleInternalError(res, statusCode, errMsg) {
  console.log('handle internal called');
  statusCode = statusCode || 400;
  res.status(statusCode).send(errMsg);
}

export function search(req, res) {
  if(req.query.type && req.query.searchText) {
    let field = req.query.type !== 'Company' ?
      req.query.type !== 'Hired' ?
      req.query.type !== 'Review' ?
      req.query.type !== 'User' ?
      req.query.type !== 'Rfp' ?
        false : ['productCategory', 'location', 'companyName'] : 'email' : ['name', 'product', 'company','reviewType'] : ['productCategory', 'location', 'companyName', 'projectTitle', 'productCategory', 'saleStage'] : 'name';
    if(!field) {
      handleInternalError(res, 400, 'Entity missing');
      return;
    }
    searchEntity(req, res, searchModel[req.query.type], req.query.searchText, field);
  } else {
    handleInternalError(res, 400, 'Malformed query');
  }
}

// Gets the list
function searchEntity(req, res, entity, text, field) {
  let query = {};
  if(Array.isArray(field)) {
    query['$or'] = [];
    field.forEach(prop => {
      let temp = {};
      temp[prop] = new RegExp(text, 'i');
      query['$or'].push(temp);
    });
  } else {
    query[field] = (new RegExp(text, 'i'));
  }
  console.log(query);
  return entity.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

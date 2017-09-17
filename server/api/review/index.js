'use strict';

var express = require('express');
var controller = require('./review.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/company/:id', controller.getCompanyReview);
router.get('/countForUser/:id', controller.countForUser);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.post('/search', controller.search);
router.post('/onoff', controller.onoff);

module.exports = router;

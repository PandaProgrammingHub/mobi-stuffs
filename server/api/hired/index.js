'use strict';

var express = require('express');
var controller = require('./hired.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/addApplicant/:id', controller.addApplied);
router.get('/filterByUserId/:id', controller.filterByUserId);
router.get('/countForUser/:id', controller.countForUser);
router.post('/closeApplicant/:id', controller.confirmApplied);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
router.post('/search', controller.search);

module.exports = router;

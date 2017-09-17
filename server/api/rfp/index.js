'use strict';

var express = require('express');
var controller = require('./rfp.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/addApplicant/:id', controller.addApplied);
router.get('/filterByUserId/:id', controller.filterByUserId);
router.post('/closeApplicant/:id', controller.confirmApplied);
router.post('/addInterest/:id', controller.addInterest);
router.get('/countForUser/:id', controller.countForUser);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;

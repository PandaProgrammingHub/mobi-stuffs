'use strict';

var express = require('express');
var controller = require('./notification.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/getNotificationsList/:userId', controller.getNotificationsList);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.post('/markViewed/:id', controller.markViewed);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;

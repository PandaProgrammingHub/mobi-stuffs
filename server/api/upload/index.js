'use strict';

var express = require('express');
var controller = require('./upload.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/company', auth.isAuthenticated(), controller.uploadCompany);

module.exports = router;

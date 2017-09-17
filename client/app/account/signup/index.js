'use strict';

import angular from 'angular';
import SignupController from './signup.controller';

export default angular.module('salesdoorApp.signup', [])
  .controller('SignupController', SignupController)
  .name;

'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';
import {mFactoryService} from "./factory.service";

export default angular.module('salesdoorApp.mfactory', [  uiRouter])
  .factory('mFactory', mFactoryService)
  .name;

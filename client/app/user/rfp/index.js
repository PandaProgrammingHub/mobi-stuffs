'use strict';

import angular from 'angular';
import userRfpController from './userRfp.controller';
import ApplyRFPController from './applyRFP/applyRFP.controller';
import sendRFPController from './sendRFP/sendRFP.controller';
import ResponseController from './responses/response.controller';
import ShowInterestController from './showInterest/showInterest.controller';
import routes from './userRfp.routes';

export default angular.module('salesdoorApp.userRfp', [])
  .config(routes)
  .component('userRfp', {
    template: require('./userRfp.html'),
    controller: userRfpController,
    controllerAs: '$ctrl'
  })
  .component('applyRfp', {
    template: require('./applyRFP/applyRFP.html'),
    controller: ApplyRFPController,
    controllerAs: '$ctrl'
  })
  .component('sendRfp', {
    template: require('./sendRFP/sendRFP.html'),
    controller: sendRFPController,
    controllerAs: '$ctrl'
  })
  .component('response', {
    template: require('./responses/response.html'),
    controller: ResponseController,
    controllerAs: '$ctrl'
  })
  .component('showInterest', {
    template: require('./responses/response.html'),
    controller: ShowInterestController,
    controllerAs: '$ctrl'
  })
  .name;

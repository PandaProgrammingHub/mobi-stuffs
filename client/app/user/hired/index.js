'use strict';

import angular from 'angular';
import HiredComponent from './hired.component';
import ApplyHiredController from './applyHired/applyHired.controller';
import sendHiredController from './sendHired/sendHired.controller';
import HiredResponse from './responses/response.controller';
import routes from './hired.routes';

export default angular.module('salesdoorApp.hired', [])
  .config(routes)
  .component('hired', {
    template: require('./hired.html'),
    controller: HiredComponent,
    controllerAs: 'hiredCtrl'
  })
  .component('applyHired', {
    template: require('./applyHired/applyHired.html'),
    controller: ApplyHiredController,
    controllerAs: '$ctrl'
  })
  .component('sendHired', {
    template: require('./sendHired/sendHired.html'),
    controller: sendHiredController,
    controllerAs: '$ctrl'
  })
  .component('hiredResponse', {
    template: require('./responses/response.html'),
    controller: HiredResponse,
    controllerAs: '$ctrl'
  })
  .name;


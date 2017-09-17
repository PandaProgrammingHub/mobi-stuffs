'use strict';

import angular from 'angular';
import RfpComponent from './rfp.component';
import routes from './rfp.routes';

export default angular.module('salesdoorApp.rfp', [])
  .config(routes)
  .component('rfp', {
    template: require('./rfp.html'),
    controller: RfpComponent,
    controllerAs: '$ctrl'
  })
  .name;


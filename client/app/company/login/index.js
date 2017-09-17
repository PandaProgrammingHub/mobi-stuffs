'use strict';

import angular from 'angular';
import CompanyLoginController from './login.controller';
import routes from './login.routes';

export default angular.module('salesdoorApp.companyLogin', [])
  .config(routes)
  .component('companyLogin', {
    template: require('./login.html'),
    controller: CompanyLoginController,
    controllerAs: '$ctrl'
  })
  .name;

'use strict';

import angular from 'angular';
import CreateCompanyController from './create_company.controller';
import routes from './create_company.routes';

export default angular.module('salesdoorApp.createCompany', [])
  .config(routes)
  .component('createCompany', {
    template: require('./create_company.html'),
    controller: CreateCompanyController,
    controllerAs: '$ctrl'
  })
  .name;

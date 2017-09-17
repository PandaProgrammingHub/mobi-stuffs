'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './companySignupSuccess.routes';

export class CompanySignupSuccessComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('salesdoorApp.companySignupSuccess', [uiRouter])
  .config(routes)
  .component('companySignupSuccess', {
    template: require('./companySignupSuccess.html'),
    controller: CompanySignupSuccessComponent,
    controllerAs: 'companySignupSuccessCtrl'
  })
  .name;

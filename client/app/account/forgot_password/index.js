'use strict';

import angular from 'angular';
import ForgotPasswordController from './forgot_password.controller';
import routes from './forgot_password.routes';

export default angular.module('salesdoorApp.forgotPassword', [])
  .config(routes)
      .component('forgotPassword', {
        template: require('./forgot_password.html'),
        controller: ForgotPasswordController,
        controllerAs: '$ctrl'
  })
  .name;

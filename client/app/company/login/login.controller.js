'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
import ForgotPasswordController from "../forgot_password/forgot_password.controller";
class Credentials {
  constructor() {
    this.email = '';
    this.password = '';
  }
}

export default class CompanyLoginController {

  /*@ngInject*/
    constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
    this.credentials = new Credentials();
    this.close = function() {};
  }

  resetPassword = function() {
    $uibModal.open({
      template: require('../forgot_password/forgot_password.html'),
      controller: ForgotPasswordController,
      controllerAs: '$ctrl'
    });
  };

  login() {
    this.Auth.companyLogin(this.credentials)
      .then(response => {
        // this.close();
        // window.location = 'review/create';
        this.$state.go('companyProfile');
      })
      .catch(err => {
        this.errorMessage = err.message;
        this.$state.go(this.$state.current);
      });
  }
}


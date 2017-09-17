'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import SignupController from '../signup/signup.controller';
import environments from '../../../environments/environment';


export default class ForgotPasswordController {

  /*@ngInject*/
  constructor($uibModalInstance, $uibModal, $http) {
    this.$uibModalInstance = $uibModalInstance;
    this.$http = $http;

    this.doSignup = function () {
      this.$uibModalInstance.close(true);
      $uibModal.open({
        template: require('../signup/signup.html'),
        controller: SignupController,
        controllerAs: '$ctrl'
      });
    };

    this.close = function () {
      this.$uibModalInstance.close(true);
    };
  }

  resetPassword() {
    this.focused = false;
    var url = environments.url;
    this.$http.post(url + 'resetpassword', this.resetpassword).then(result => {
      this.errormessage = '';
      this.message = result.data.message;
    }).catch(error => {
      this.message = '';
      this.errormessage = error.data.message;
      console.error('Error occurred while getting user profile from server', error);
    });
  }
}

'use strict';
import SignupController from '../signup/signup.controller';
import ForgotPasswordController from '../forgot_password/forgot_password.controller';
export default class LoginController {
  /*@ngInject*/
  constructor(Auth, $state, $uibModalInstance, $uibModal) {
    this.$uibModalInstance = $uibModalInstance;
    this.Auth = Auth;
    this.$state = $state;
    this.errorMessage = '';

    this.doSignup = function() {
      this.$uibModalInstance.close(true);
      $uibModal.open({
        template: require('../signup/signup.html'),
        controller: SignupController,
        controllerAs: '$ctrl'
      });
    };
    this.resetPassword = function() {
      this.$uibModalInstance.close(true);
      $uibModal.open({
        template: require('../forgot_password/forgot_password.html'),
        controller: ForgotPasswordController,
        controllerAs: '$ctrl',
      });
    };

    this.close = function() {
      $uibModalInstance.close(true);
    };
  };

  login(form) {
    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          this.close();
          this.$state.go('writeReview');
        })
        .catch(err => {
          this.$state.go('main');
          this.errorMessage = err.message;
        });
    }
  }
}

'use strict';

import angular from 'angular';
import LoginController from '../login/login.controller';

export default class SignupController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $state, $uibModalInstance, $uibModal,$scope) {
    this.Auth = Auth;
    this.$state = $state;
    this.$uibModalInstance = $uibModalInstance;
    this.errorMessage = '';
    this.doLogin = function() {
      this.$uibModalInstance.close(true);
      $uibModal.open({
        template: require('../login/login.html'),
        controller: LoginController,
        controllerAs: '$ctrl',
        size: 'md',
      });
    };
    $scope.arrlist = [{
      "userid": 1,
    }];

    $scope.checkoptions = function (choice) {
      var details = [];
      angular.forEach(choice, function (value, key) {
        if (choice[key].checked) {
          details.push(choice[key].userid);

        }
      });
      if (details.length == 0)
        $scope.msg = 'Please accept the Terms And Conditions';
      else
        $scope.msg = '';
    }
  }

  close = function() {
    this.$uibModalInstance.close(true);
  };

  register(form) {
    if(form.$valid) {
      return this.Auth.createUser({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.close();
          this.$state.go('additionalinfoone');
        })
        .catch(err => {
          err = err.data;
          this.errorMessage = err.message;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

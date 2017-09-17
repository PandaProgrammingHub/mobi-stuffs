'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './login.routes';


export class LoginComponent {
  adminuser = {
    email:'',
    password:''
  }
  //  '@ngInject';
  constructor(Auth,$state, $uibModal,$scope) {
    this.Auth = Auth;
    this.message = "Hello";
    this.$state = $state;
    this.isAdminLoggedIn();
  }

  isAdminLoggedIn() {
    this.Auth.getCurrentUser().then(result => {
      if(result.role == 'admin'){
        this.$state.go('adminDashboard');
      }
    }).catch(error => {
      console.error("Error occurred while getting UserInfo from server", error);
    });
  }
  stateName() {
   if (this.$state.current.name == 'adminLogin') {
      return true;
    } else {
      return false;
    }
  }

login(form) {
  if(form.$valid) {
    this.Auth.adminLogin({
      email: this.adminuser.email,
      password: this.adminuser.password
    })
      .then(() => {
        this.$state.go('adminDashboard');
      })
      .catch(err => {
        this.$state.go('adminLogin');
        this.errorMessage = err.message;
      });
  } else {
    this.errorMessage = "Please enter vaild email id and password";
    console.log(this.errorMessage);

  }
}
}

export default angular.module('salesdoorApp.adminlogin', [uiRouter])
  .config(routes)
  .component('adminlogin', {
    template: require('./login.html'),
    controller: LoginComponent,
    controllerAs: 'logindCtrl'
  })
  .name;

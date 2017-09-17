'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './resetpassword.routes';
import enviornment from '../../../environments/environment';

export class ResetpasswordComponent {
  /*@ngInject*/
  constructor($location, $http, $window, $state,) {
    this.$routeParams = $location;
    this.$http = $http;
    this.$state = $state;
    this.message = 'Hello';
    this.isMatch = false;
    this.$window = $window;
  }

  isPasswordMatch() {
    if (this.user.pwd != this.user.cpassword) {
      this.isMatch = true;
    } else {
      this.isMatch = false;
      this.setNewPassword();
    }
  }

  setNewPassword() {
    this.user.emailId = this.$routeParams.search().id;
    let url = enviornment.url + 'users/updatepassword';
    this.$http.post(url, this.user).then(result => {
      if(result.status == '204') {
        this.$window.alert('Password Updated successfully');
        this.$state.go('main');
      } else {
        this.$window.alert('Ther is issue while updating password');
      }
    });
  }
}

export default angular.module('salesdoorApp.resetpassword', [uiRouter])
  .config(routes)
  .component('resetpassword', {
    template: require('./resetpassword.html'),
    controller: ResetpasswordComponent,
    controllerAs: 'resetpasswordCtrl'
  })
  .name;

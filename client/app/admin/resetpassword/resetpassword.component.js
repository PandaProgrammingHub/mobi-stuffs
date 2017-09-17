'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './resetpassword.routes';
import {environment} from '../../../environments/environment';



export class ResetpasswordComponent {
  adminresetpasswordObj = {
    "emailId":'',
    "pwd":''
  }
  //  '@ngInject';
  constructor(Auth,$http,$state, $uibModal,$scope) {
    this.message = 'Hello';
    this.Auth = Auth;
    this.isAdmin();
    this.$state = $state;
    this.adminResetPassword = function(form) {
      if(form.$valid) {
        var url = environment.url;
        var data = this.adminresetpasswordObj;
        url = url + 'users/updatepassword';
        return $http.post(url, data)
          .then(function success(response) {
            if(response.status == 204){
              alert("password reset successfully");
            }
            //return response;
          }).catch(function error(error) {
            alert("oops!!Something went wrong");
            return error;
          });
      } else {
        this.errorMessage = "Please enter vaild email id and password";
        alert("Please enter vaild email id and password");
        console.log(this.errorMessage);

      }
    }
  }

  isAdmin() {
    this.Auth.getCurrentUser().then(result => {
      if(result.role !=='admin'){
        this.$state.go('adminLogin');
      }
    }).catch(error => {
      console.error("Error occurred while getting UserInfo from server", error);
    });
  }
 resetFrom(form){
   form.emailId = null;
  form.pwd = null;
   //this.adminresetpasswordObj = {"emailId":'',"pwd":''};
 }
  stateName() {
   if (this.$state.current.name == 'adminResetpassword') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.adminresetpassword', [uiRouter])
  .config(routes)
  .component('adminresetpassword', {
    template: require('./resetpassword.html'),
    controller: ResetpasswordComponent,
    controllerAs: 'resetpasswordCtrl'
  })
  .name;

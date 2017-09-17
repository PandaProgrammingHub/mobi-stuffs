'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './rfpAdmin.routes';

export class rfpAdminComponent {

  // '@ngInject'
  constructor(Auth,$http, $scope, $state) {
    this.Auth = Auth;
    this.isAdmin();
    this.$state = $state;
    this.$scope = $scope;
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

  stateName() {
    if(this.$state.current.name == 'rfpAdmin') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.rfpAdmin', [uiRouter])
  .config(routes)
  .component('rfpAdmin', {
    template: require('./rfpAdmin.html'),
    controller: rfpAdminComponent,
    controllerAs: 'rfpAdminCtrl'
  })
  .name;

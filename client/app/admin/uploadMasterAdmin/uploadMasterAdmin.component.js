'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './uploadMasterAdmin.routes';

export class uploadMasterAdminComponent {

  /*@ngInject*/
  constructor(Auth,$http, $scope, $state) {
    this.Auth = Auth;
    this.isAdmin();
    this.$state = $state;
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
    if(this.$state.current.name == 'uploadMasterAdmin') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.uploadMasterAdmin', [uiRouter])
  .config(routes)
  .component('uploadMasterAdmin', {
    template: require('./uploadMasterAdmin.html'),
    controller: uploadMasterAdminComponent,
    controllerAs: 'uploadMasterAdminCtrl'
  })
  .name;

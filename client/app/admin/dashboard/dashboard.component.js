'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';


export class DashboardComponent {
  //  '@ngInject';
  constructor(Auth,$state, $uibModal,$scope) {
    this.message = 'Hello';
    this.Auth = Auth;
    this.$state = $state;
    this.isAdmin();
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
   if (this.$state.current.name == 'adminDashboard') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;

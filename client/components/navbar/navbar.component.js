'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';
import LoginController from '../../app/account/login/login.controller';

export class NavbarComponent {
  constructor(Auth, $uibModal, $state) {
    'ngInject';
    this.doLogin = function() {
      $uibModal.open({
        template: require('../../app/account/login/login.html'),
        controller: LoginController,
        controllerAs: '$ctrl',
        size: 'md',
      });
    };
    this.$state = $state;
    this.doLogout = Auth.logout;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.flag = false;
  }

  checkSession() {
    if(this.isLoggedIn()) {
      this.$state.go('writeReview');
    } else {
      this.doLogin();
    }
  }

  logout() {
    this.doLogout();
    this.$state.go('main');
  }
  adminLogout() {
    this.doLogout();
    this.$state.go('adminLogin');
  }
  stateName() {
   if (this.$state.current.name == 'adminUsers') {
      return true;
    } else if (this.$state.current.name == 'adminReview') {
      return true;
    } else if (this.$state.current.name == 'adminHire') {
      return true;
    } else if (this.$state.current.name == 'adminDashboard') {
      return true;
    } else if (this.$state.current.name == 'adminCompany') {
     return true;
    } else if (this.$state.current.name == 'rfpAdmin') {
     return true;
    } else if (this.$state.current.name == 'uploadMasterAdmin') {
     return true;
    } else if (this.$state.current.name == 'adminResetpassword') {
     return true;
   } else if (this.$state.current.name == 'adminLogin') {
     return "login";
    } else {
      return false;
    }
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent,
    controllerAs: '$ctrl'
  })
  .name;

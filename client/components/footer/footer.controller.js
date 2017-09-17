'use strict';
const angular = require('angular');

export default class FooterController {
  /*@ngInject*/
  constructor($state) {
    this.$state = $state;
    this.flag = false;
  };

  stateName() {
    if (this.$state.current.name == 'companyLogin') {
      return true;
    } else if (this.$state.current.name == 'companySignup') {
        return true;
    } else if (this.$state.current.name == 'companySignupSuccess') {
      return true;
    }  else if (this.$state.current.name == 'adminDashboard') {
      return true;
    } else if (this.$state.current.name == 'adminUsers') {
      return true;
    } else if (this.$state.current.name == 'adminReview') {
      return true;
    } else if (this.$state.current.name == 'adminHire') {
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

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');


import routes from './companySignup.routes';

export class CompanySignupComponent {
  user = {
    name: '',
    password: '',
    email: '',
    company: '',
    designation: ''
  };
  submitted = false;
  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.message = 'Hello';
    this.$state = $state;
    this.errorMessage = '';
  }
  register(form) {
    if(form.$valid) {
      let companyObj = {
        name: this.user.name,
        email: this.user.email,
        role: 'company',
        password: this.user.password,
        company: this.user.company,
        designation: this.user.designation
      };
      return this.Auth.createCompany(companyObj)
        .then(() => {
          window.location = '/company/signup-success';
        })
        .catch(err => {
          err = err.data;
          this.errorMessage = err.message;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
         /* angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
             this.errors[field] = error.message;
          });*/
        });
    }
  }
}

export default angular.module('salesdoorApp.companySignup', [uiRouter])
  .config(routes)
  .component('companySignup', {
    template: require('./companySignup.html'),
    controller: CompanySignupComponent,
    controllerAs: 'companySignupCtrl'
  })
  .name;

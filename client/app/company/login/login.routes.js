'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companyLogin', {
      url: '/company/login',
      template: '<company-login></company-login>'
    });
}

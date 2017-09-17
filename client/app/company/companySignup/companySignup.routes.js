'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companySignup', {
      url: '/company/signup',
      template: '<company-signup></company-signup>'
    });
}

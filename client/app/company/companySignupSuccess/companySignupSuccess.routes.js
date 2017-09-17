'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companySignupSuccess', {
      url: '/company/signup-success',
      template: '<company-signup-success></company-signup-success>'
    });
}

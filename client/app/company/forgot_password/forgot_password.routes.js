'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('forgot_company_password', {
      url: '/company/forgot_password',
      template: '<forgot-password></forgot-password>'
    });
}

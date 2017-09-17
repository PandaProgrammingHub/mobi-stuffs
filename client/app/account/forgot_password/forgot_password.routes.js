'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('forgot_password', {
      url: '/forgot_password',
      template: '<forgot-password></forgot-password>'
    });
}

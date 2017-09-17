'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminResetpassword', {
      url: '/admin/resetpassword',
      template: '<adminresetpassword></adminresetpassword>',
    });
}

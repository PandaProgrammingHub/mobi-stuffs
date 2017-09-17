'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminLogin', {
      url: '/admin/login',
      template: '<adminlogin></adminlogin>',
    });
}

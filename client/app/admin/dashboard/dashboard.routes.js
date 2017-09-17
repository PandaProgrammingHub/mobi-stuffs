'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminDashboard', {
      url: '/admin/dashboard',
      template: '<dashboard></dashboard>',
    });
}

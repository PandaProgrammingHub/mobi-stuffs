'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminUsers', {
      url: '/admin/users',
      template: '<users></users>',
    });
}

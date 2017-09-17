'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('joinGroups', {
      url: '/joinGroups',
      template: '<join-groups></join-groups>',
      authenticate: 'user'
    });
}

'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('hireMe', {
      url: '/company/hire',
      template: '<hire-me></hire-me>',
      // authenticate: 'user'
    });
}

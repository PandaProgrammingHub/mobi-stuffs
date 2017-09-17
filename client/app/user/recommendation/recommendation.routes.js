'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('recommendation', {
      url: '/user/recommendation',
      template: '<recommendation></recommendation>',
      authenticate: 'user'
    });
}

'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('additionalinfotwo', {
      url: '/additionalinfotwo',
      template: '<additionalinfotwo></additionalinfotwo>',
      authenticate: 'user'
    });
}

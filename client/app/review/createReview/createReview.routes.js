'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('writeReview', {
      url: '/review/create',
      template: '<write-review></write-review>',
      authenticate: 'user'
    });
}

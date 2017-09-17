'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('salesReview', {
      url: '/review/sales',
      template: '<sales-review></sales-review>',
      authenticate: 'user'
    });
}

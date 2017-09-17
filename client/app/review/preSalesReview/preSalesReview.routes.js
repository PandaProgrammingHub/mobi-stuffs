'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('pre-salesReview', {
      url: '/review/presales',
      template: '<pre-sales-review></pre-sales-review>',
      authenticate: 'user'
    });
}

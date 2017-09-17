'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('salesReviewSignup', {
      url: '/salesReviewSignup',
      template: '<sales-review-signup></sales-review-signup>',
      authenticate: 'user'
    });
}

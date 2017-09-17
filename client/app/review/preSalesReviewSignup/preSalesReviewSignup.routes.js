'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('preSalesReviewSignup', {
      url: '/preSalesReviewSignup',
      template: '<pre-sales-review-signup></pre-sales-review-signup>',
      authenticate: 'user'
    });
}

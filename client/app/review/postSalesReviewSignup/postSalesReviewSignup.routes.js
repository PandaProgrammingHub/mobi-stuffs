'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('postSalesReviewSignup', {
      url: '/postSalesReviewSignup',
      template: '<post-sales-review-signup></post-sales-review-signup>',
      authenticate: 'user'
    });
}

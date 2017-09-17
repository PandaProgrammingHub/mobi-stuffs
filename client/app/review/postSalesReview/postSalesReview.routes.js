'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('postSalesReview', {
      url: '/review/postsales',
      template: '<post-sales-review></post-sales-review>',
      authenticate: 'user'
    });
}

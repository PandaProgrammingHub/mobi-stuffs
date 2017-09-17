'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('overallReviewSignup', {
      url: '/overallReviewSignup',
      template: '<overall-review-signup></overall-review-signup>',
      authenticate: 'user'
    });
}

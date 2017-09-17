'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('createReviewTwo', {
      url: '/review/create_two',
      template: '<create-review-two></create-review-two>'
    });
}

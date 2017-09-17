'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('overallReview', {
      url: '/review/overall',
      template: '<overall-review></overall-review>',
      authenticate: 'user'
    });
}

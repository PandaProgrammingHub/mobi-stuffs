'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminReview', {
      url: '/admin/review',
      template: '<review></review>',
    });
}

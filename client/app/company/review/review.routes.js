'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('reviews', {
      url: '/company/review',
      template: '<reviews></reviews>'
    });
}

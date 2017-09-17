'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userreviews', {
      url: '/user/reviews',
      template: '<userreviews></userreviews>',
      authenticate: 'user'
    });
}

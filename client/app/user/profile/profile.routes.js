'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('profile', {
      url: '/user/profile',
      template: '<profile></profile>',
      authenticate: 'user'
    });
    // .state('reviews', {
    //   url: '/user/reviews',
    //   template: '<reviews></reviews>'
    // });
}

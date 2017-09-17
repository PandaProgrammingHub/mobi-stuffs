'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('writereviewsignup', {
      url: '/writereviewsignup',
      template: '<writereviewsignup></writereviewsignup>',
      authenticate: 'user'
    });
}

'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('resetpassword', {
      url: '/resetpassword',
      template: '<resetpassword></resetpassword>'
    });
}

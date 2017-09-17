'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('postPopup', {
      url: '/postPopup',
      template: '<post-popup></post-popup>',
      authenticate: 'user'
    });
}

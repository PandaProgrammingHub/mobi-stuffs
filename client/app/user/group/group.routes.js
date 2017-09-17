'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('group', {
      url: '/user/group',
      template: '<group></group>',
      authenticate: 'user'
    });
}

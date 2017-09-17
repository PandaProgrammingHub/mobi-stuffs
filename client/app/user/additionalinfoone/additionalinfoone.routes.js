'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('additionalinfoone', {
      url: '/additionalinfoone',
      template: '<additionalinfoone></additionalinfoone>',
      authenticate: 'user'
    });
}

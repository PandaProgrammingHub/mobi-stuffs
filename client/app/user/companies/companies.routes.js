'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companies', {
      url: '/user/companies',
      template: '<companies></companies>',
      authenticate: 'user'
    });
}

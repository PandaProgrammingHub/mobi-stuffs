'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('create_company', {
      url: '/company/create_company',
      template: '<create-company></create-company>'
    });
}

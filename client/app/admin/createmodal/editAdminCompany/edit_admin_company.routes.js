'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('editAdminCompany', {
      url: '/company/editadmincompany',
      template: '<create-company></create-company>'
    });
}

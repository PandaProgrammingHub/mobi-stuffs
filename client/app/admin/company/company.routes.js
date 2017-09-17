'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminCompany', {
      url: '/admin/company',
      template: '<company></company>'
    });
}

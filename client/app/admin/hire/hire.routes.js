'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminHire', {
      url: '/admin/hire',
      template: '<hire></hire>',
    });
}

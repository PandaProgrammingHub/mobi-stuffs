'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rfpAdmin', {
      url: '/admin/rfp',
      template: '<rfp-admin></rfp-admin>'
    });
}


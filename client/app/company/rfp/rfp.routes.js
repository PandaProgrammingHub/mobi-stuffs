'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('rfp', {
      url: '/company/rfp',
      template: '<rfp></rfp>'
    });
}

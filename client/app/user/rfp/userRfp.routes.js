'use strict';
export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userRfp', {
      url: '/user/userRfp',
      template: '<user-rfp></user-rfp>'
    })
    .state('userRfp.applyRfp', {
      url: '/applyRFP',
      template: '<apply-rfp></apply-rfp>',
    })
    .state('userRfp.sendRfp', {
      url: '/sendRFP',
      template: '<send-rfp></send-rfp>'
    })
    .state('userRfp.response', {
      url: '/response/:uid',
      template: '<response></response>'
    });
}

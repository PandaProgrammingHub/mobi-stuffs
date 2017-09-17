'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('hired', {
      url: '/user/hired',
      template: '<hired></hired>'
    })
    .state('hired.applyHired', {
      url: '/applyHired',
      template: '<apply-hired></apply-hired>',
    })
    .state('hired.sendHired', {
      url: '/sendHired',
      template: '<send-hired></send-hired>'
    })
    .state('hired.response', {
      url: '/response/:uid',
      template: '<hired-response></hired-response>'
    });
}

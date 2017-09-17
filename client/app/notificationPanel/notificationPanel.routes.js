'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('notificationPanel', {
      url: '/notificationPanel',
      template: '<notification-panel></notification-panel>'
    });
}

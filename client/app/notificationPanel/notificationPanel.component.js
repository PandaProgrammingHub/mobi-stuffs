'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './notificationPanel.routes';

export class NotificationPanelComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('salesdoorApp.notificationPanel', [])
  .component('notificationPanel', {
    template: require('./notificationPanel.html'),
    controller: NotificationPanelComponent,
    controllerAs: 'notificationPanelCtrl'
  })
  .name;

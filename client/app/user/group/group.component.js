'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './group.routes';

export class GroupComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('salesdoorApp.group', [uiRouter])
  .config(routes)
  .component('group', {
    template: require('./group.html'),
    controller: GroupComponent,
    controllerAs: 'groupCtrl'
  })
  .name;

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './leftNav.routes';

export class LeftNavComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('salesdoorApp.leftNav', [])
  .component('leftNav', {
    template: require('./leftNav.html'),
    controller: LeftNavComponent,
    controllerAs: 'leftNavCtrl'
  })
  .name;

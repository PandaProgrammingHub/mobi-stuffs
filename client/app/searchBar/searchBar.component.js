'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './searchBar.routes';

export class SearchBarComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('salesdoorApp.searchBar', [uiRouter])
  .config(routes)
  .component('searchBar', {
    template: require('./searchBar.html'),
    controller: SearchBarComponent,
    controllerAs: 'searchBarCtrl'
  })
  .name;

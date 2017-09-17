'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class HiredComponent {
  /*@ngInject*/
  constructor($scope, $state) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$state = $state;
  }
}

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class applyModalController{
  /*@ngInject*/
  constructor($uibModalInstance) {
    this.$uibModalInstance = $uibModalInstance;
    this.message = 'Hello';
    this.close = function() {
      this.$uibModalInstance.close(true);
    };
  }
}

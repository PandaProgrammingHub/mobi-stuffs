'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class RfpComponent {
  /*@ngInject*/
  constructor($uibModalInstance) {
    this.$uibModalInstance = $uibModalInstance;
    this.close = function() {
      $uibModalInstance.close(true);
    };
    this.message = 'Hello';
  }
}

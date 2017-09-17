'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');


export default class ForgotPasswordController {
  /*@ngInject*/
  constructor( $uibModalInstance ) {
    this.$uibModalInstance = $uibModalInstance;
    this.close = function () {
      console.log('clicked')
      this.$uibModalInstance.close(true);
    };
  }
}


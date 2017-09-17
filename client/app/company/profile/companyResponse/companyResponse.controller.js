'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {masterService} from '../../../services/master/master.service';

export default class companyResponseController {
  /*@ngInject*/
  constructor($http, userObject, $uibModalInstance) {
    this.userObject = userObject;
    this.masterService = new masterService($http);
    // console.log("userObject :", userObject);
    this.$uibModalInstance = $uibModalInstance;
    this.userObject.companyResponse = '';
  }

  submitResponse() {
    let that = this;
    // console.log('responseObject :',that.responseObject);
    that.masterService.updateCompanyResponse(that.userObject).then(result => {
      // console.log(' result =', angular.toJson(result));
      if(result.status == 200){
        this.$uibModalInstance.close(true);
      }
    }).catch(error => {
      console.error('Error occurred while getting company Reviews from server', error);
    });
  }

  closeModal() {
    this.$uibModalInstance.close(true);
  }
}


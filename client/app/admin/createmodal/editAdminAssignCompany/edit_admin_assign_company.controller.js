'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class EditAdminAssignCompanyController {
  editCompanyList = {
    name: "",
    headquarters: "",
    industry: "",
    website: ""
  }
  /*@ngInject*/
  constructor($uibModalInstance, $scope, company) {
    $scope.company = company;
    this.$uibModalInstance = $uibModalInstance;
    this.close = function() {
      console.log('clicked')
      this.$uibModalInstance.close(true);
    };
    this.updateCompany = function(form){
      var companyValue = $scope.company;
      $uibModalInstance.close(companyValue);
      if(form.$valid) {
        this.close(form);
      }
      else {
        console.log("not valid user creted");
      }
    };
  }
}


'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');


export default class CreateCompanyController {
  createCompanyList = {
    name: "",
    headquarters: "",
    industry: "",
    website: ""
  }

  /*@ngInject*/
  constructor($uibModalInstance, $scope) {
    this.$uibModalInstance = $uibModalInstance;
    this.close = function(data) {
      $uibModalInstance.close(data);
    };
    this.createCompany = function(company){
      var newCompanyData = $scope.company;
      console.log('controller company',$scope.company);
      $uibModalInstance.close(newCompanyData);
    };

  }
}


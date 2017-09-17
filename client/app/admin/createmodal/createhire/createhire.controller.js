'use strict';
import {masterService} from '../../../services/master/master.service';
import {environment} from '../../../../environments/environment';
export default class CreatehireController {
  createHireList = {
    "projectTitle": '',
    "productCategory": '',
    "location": '',
    "docs": 'Link to S3 bucket',
    "priority": 'low',
    "saleStage": "Sales",
    "postedBy": "",
    "date":new Date(),

  };
  locations = [];
  products = [];
  /*@ngInject*/
  constructor(Auth, $state,$http, $uibModalInstance, $uibModal) {
    this.$uibModalInstance = $uibModalInstance;
    this.$state = $state;
    this.errorMessage = '';
    this.masterService = new masterService($http);

    this.getLocations();
    this.getProducts();
    this.close = function(data) {
      $uibModalInstance.close(data);
    };

    this.postHire = function(hireData){
      var url = environment.url;
      url = url + 'hireds';
      return $http.post(url, hireData)
      .then(() => {
        this.close(this.createHireList);
      })
      .catch(err => {
        err = err.data;
        this.errorMessage = err.message;
      });
    }

    this.createhire = function(form){
      if(form.$valid) {
        this.postHire(this.createHireList);
      }
      else{
        console.log("not valid hire creted");
      }
    }
  };
  getLocations() {
    this.selectedLocations = null;
    this.masterService.getLocations().then(result => {
      this.locations = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting locations from server', error);
      });
  }

  getProducts() {
    this.selectedProducts = null;
    this.masterService.getProducts().then(result => {
      this.products = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting products from server', error);
      });
  }
}

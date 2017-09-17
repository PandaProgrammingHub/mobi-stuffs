'use strict';
import {masterService} from '../../../services/master/master.service';
import {environment} from '../../../../environments/environment';

export default class CreatereviewController {
  createReviewList = {
    "name":"",
    "product":"",
    "location":"",
    "company": "",
    "reviewType": "sales",
    "postedBy": "",
    "flag":1,
    "date":new Date(),
  };
  companies = [];
  locations = [];
  products = [];
  /*@ngInject*/
  constructor(Auth, $state,$http, $uibModalInstance, $uibModal) {
    this.$uibModalInstance = $uibModalInstance;
    this.$state = $state;
    this.errorMessage = '';
    this.masterService = new masterService($http);
    this.getCompanies();
    this.getLocations();
    this.getProducts();
    this.close = function(data) {
      $uibModalInstance.close(data);
    };
    this.addReview = function(reviewData){
      var url = environment.url;
      url = url + 'reviews';
      return $http.post(url, reviewData)
      .then(() => {
        this.close(this.createReviewList);
      })
      .catch(err => {
        err = err.data;
        this.errorMessage = err.message;
      });
    }
    this.createreview = function(form){
      if(form.$valid) {
        this.addReview(this.createReviewList);
      }
      else{
        console.log("not valid review creted");
      }
    }
  };
  getCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
  }
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

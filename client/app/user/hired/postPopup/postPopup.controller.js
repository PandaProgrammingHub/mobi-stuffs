'use strict';
import {masterService} from '../../../services/master/master.service';

class Hired {
  constructor() {
    this.projectTitle = '';
    this.productCategories = '';
    this.location = '';
    this.salesStage = '';
    this.endDate = '';
    this.priority = '';
    this.description = '';
    this.postedBy = '';
  }
}

export default class PostPopupController {
  /*@ngInject*/
  constructor($uibModalInstance, $http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.$uibModalInstance = $uibModalInstance;
    this.masterService = new masterService($http);
    this.productsList = [];
    this.locationsList = [];
    this.hired = new Hired();
    this.close = function() {
      $uibModalInstance.close(true);
    };
  }

  postHired() {
    this.$http.post('/api/hireds', this.hired)
      .then(response => {
        this.hiredsList = response.data;
      }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
    window.location.reload();
  }

  isValid(status) {
    if (status === true) {
      return this.hired.priority && this.hired.productCategories.length && this.hired.location.length && this.hired.salesStage && this.hired.postedBy
    }
    return false;
  }

  $onInit() {
    this.products = function() {
      this.masterService.getProducts()
        .then(res => res.data.map(item => this.productsList.push(item.name)));
    };
    this.locations = function() {
      this.masterService.getLocations()
        .then(res => res.data.map(item => this.locationsList.push(item.name)));
    };
    this.products();
    this.locations();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.hired.postedBy = result; //TODO: Reduce user visibility. Pickup after
    }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
  }

  setPriority(val) {
    this.hired.priority = val;
  }

}

'use strict';
import {masterService} from '../../../services/master/master.service';

class Rfp {
  constructor() {
    this.rfpTitle = '';
    this.productCategories = '';
    this.location = '';
    this.endDate = '';
    this.budgetStart = '';
    this.budgetEnd = '';
    this.proposalDescription = '';
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
    this.rfp = new Rfp();
    this.close = function() {
      $uibModalInstance.close(true);
    };
  }

  postRfp() {
    this.$http.post('/api/rfps', this.rfp)
      .then(response => {
        this.rfpsList = response.data;
        window.location.reload();
      }).catch(error => {
        console.error("Error occurred while getting UserId from server", error);
    });
  }

  isValid(status) {
    if (status === true) {
      return this.rfp.productCategories.length && this.rfp.location.length && this.rfp.postedBy;
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
      this.rfp.postedBy = result;
    }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
  }

  setPriority(val) {
    this.rfp.priority = val;
  }

}

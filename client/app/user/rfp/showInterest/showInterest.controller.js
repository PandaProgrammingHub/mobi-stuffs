'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import {masterService} from '../../../services/master/master.service';

class Interest {
  constructor() {
    this.companyName = '';
    this.email = '';
    this.phoneNumber = '';
    this.location = [];
    this.message = '';
    this.fromUser = '';
  }
}

export default class ShowInterestController {

  /*@ngInject*/
  constructor($uibModalInstance, $http, Auth, rfp) {
    this.$http = $http;
    this.Auth = Auth;
    this.$uibModalInstance = $uibModalInstance;
    this.masterService = new masterService($http);
    this.locationsList = [];
    this.interest = new Interest();
    this.rfp = rfp._id;
    this.close = function() {
      $uibModalInstance.close(true);
    };
  }

  postInterest() {
    this.$http.post('/api/rfps/addInterest/' + this.rfp, this.interest)
      .then(response => {
        window.location.reload();
      }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
  }

  isValid(status) {
    if(status === true) {
      return this.interest.location.length && this.interest.fromUser;
    }
    return false;
  }

  $onInit() {
    this.locations = function() {
      this.masterService.getLocations()
        .then(res => res.data.map(item => this.locationsList.push(item.name)));
    };
    this.locations();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.interest.fromUser = result;
    }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
  }


}

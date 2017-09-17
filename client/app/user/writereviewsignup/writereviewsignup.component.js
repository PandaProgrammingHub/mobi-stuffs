'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './writereviewsignup.routes';
import environment from "../../../environments/environment";
import {masterService} from "../../services/master/master.service";

export class WritereviewsignupComponent {
  companies=[];
  selectedCompany = '';
  reviewType={};
  /*@ngInject*/
  constructor($http,$state, $scope,Auth,mFactory) {
    this.$state = $state;
    this.$scope = $scope;
    this.$http=$http;
    this.Auth = Auth;
    this._mFactory = mFactory;
    this.masterService = new masterService($http);
    this.result = '';
    this.showAlertForType = false;
    this.showAlertForCompany = false;
    this.getCompanies();
    this.onSelect = function($item) {
      this.reviewType.selectedCompany = $item;
    };
  }
  submitResult = function(result) {
    var self=this;
    if(!result)
      this.showAlertForType=true;
    else if (!this.reviewType.selectedCompany && !this.company) {
      this.showAlertForCompany = true;
      this.showAlertForType=false;
    }
    else  if(result && !this.reviewType.selectedCompany && this.company!==undefined){
      this.showAlertForCompany = false;
      this.showAlertForType=false;
      var url = environment.url;
      url = url + 'companies';
      this.$http.post(url,{name: this.company}).then(function success(response) {
        self.reviewType.selectedCompany={};
        self.reviewType.selectedCompany.name = self.company;
        self.reviewType.selectedCompany._id = response.data._id;
        self.submitReview(result);
      })
        .catch(function error(revErr) {
          return revErr;
        });
    }
    else
    {
      this.submitReview(result);
    }
  };

  submitReview(result) {
    this._mFactory .setReviewType(this.reviewType);
    if(this.showAlertForCompany)
      this.showAlertForCompany = false;
    if(this.showAlertForType)
      this.showAlertForType=false;
    switch (result)
    {
      case '/overallReviewSignup':
        this.$state.go('overallReviewSignup')
        break;
      case '/preSalesReviewSignup':
        this.$state.go('preSalesReviewSignup')
        break;
      case '/salesReviewSignup':
        this.$state.go('salesReviewSignup')
        break;
      case '/postSalesReviewSignup':
        this.$state.go('postSalesReviewSignup')
        break;
      default :break;
    }
  }
  getCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server',error);
      });
  }
  skipToCompanies() {
    this.$state.go('followCompanies');
    this._mFactory.setSale(false);
    this._mFactory.setPreSale(false);
    this._mFactory.setPostSale(false);
    this._mFactory.setOverall(false);
  }
  closeAlertCompany()
  {
    this.showAlertForCompany = false;
  }
  closeAlertType()
  {
    this.showAlertForType = false;
  }
}

export default angular.module('salesdoorApp.writereviewsignup', [uiRouter])
  .config(routes)
  .component('writereviewsignup', {
    template: require('./writereviewsignup.html'),
    controller: WritereviewsignupComponent,
    controllerAs: 'writereviewsignupCtrl'
  })
  .name;

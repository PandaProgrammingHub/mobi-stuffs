'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './createReviewTwo.routes';
import environment from "../../../environments/environment";
import {masterService} from "../../services/master/master.service";

export class CreateReviewTwoComponent {
  $state;
  overAllReview=true;
  postSales=true;
  preSales=true;
  sales=true;
  reviewType={};
  /*@ngInject*/
  constructor($state,$http,Auth,mFactory,$window) {
    this.$window = $window;
    this.$state = $state;
    this.Auth = Auth;
    this.$http=$http;
    this.showAlertForType = false;
    this.showAlertForCompany = false;
    this.masterService = new masterService($http);
    this._mFactory = mFactory;
    this.overAllReview=this._mFactory.getOverall();
    this. postSales=this._mFactory.getPostSale();
    this. preSales=this._mFactory.getPreSale();
    this.sales=this._mFactory.getSale();
    this.showAlertForType = false;
    this.showAlertForCompany = false;
    this.checkParams();
    this.getCompanies();
    this.onSelect = function($item) {
      this.reviewType.selectedCompany = $item;
      this.reviewType.isAnonymous = false;
    };
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
  checkParams() {
    if(this._mFactory.getOverall()===true &&
      this._mFactory.getPostSale()===true&&
      this._mFactory.getPreSale()===true&&
      this._mFactory.getSale()===true)
    {
      this.goToProfile();
    }
    else {
      if (this._mFactory.getOverall() === true)
        this.overAllReview = true;
      if (this._mFactory.getPostSale() === true) {
        this.postSales = true;
      }
      if (this._mFactory.getPreSale() === true) {
        this.preSales = true;
      }
      if (this._mFactory.getSale() === true) {
        this.sales = true;
      }
    }
  }
  closeAlertCompany()
  {
    this.showAlertForCompany = false;
  }
  closeAlertType()
  {
    this.showAlertForType = false;
  }
  submitNextReview=function (result) {
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
    this.$window.localStorage.setItem('comp', this.reviewType.selectedCompany.name);
    this._mFactory .setReviewType(this.reviewType);
    if(this.showAlertForCompany)
      this.showAlertForCompany = false;
    if(this.showAlertForType)
      this.showAlertForType=false;
    switch (result)
    {
      case '/review/overall':
        this.$state.go('overallReview')
        break;
      case '/review/presales':
        this.$state.go('pre-salesReview')
        break;
      case '/review/sales':
        this.$state.go('salesReview')
        break;
      case '/review/postsales':
        this.$state.go('postSalesReview')
        break;
      default :break;
    }
  }
  goToProfile=function () {
    this.$state.go('profile');
    this._mFactory.setSale(false);
    this._mFactory.setPreSale(false);
    this._mFactory.setPostSale(false);
    this._mFactory.setOverall(false);
  }
}

export default angular.module('salesdoorApp.createReviewTwo', [uiRouter])
  .config(routes)
  .component('createReviewTwo', {
    template: require('./createReviewTwo.html'),
    controller: CreateReviewTwoComponent,
    controllerAs: 'createReviewTwoCtrl'
  })
  .name;

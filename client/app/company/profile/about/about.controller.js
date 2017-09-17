'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import {masterService} from '../../../services/master/master.service';
import _ from 'lodash';
export default class AboutController {
  /*@ngInject*/
  constructor($http, $location, mFactory, $rootScope, $state, Auth) {
    this.Auth = Auth;
    this.$state = $state;
    this.$http = $http;
    this.$location = $location;
    this.mFactory = mFactory;
    this.$rootScope = $rootScope;
    this.masterService = new masterService($http);
    this.getCompanyData();
    this.getCompanyReview();
    this.avgpreSalesRating = 0;
    this.avgSalesRating = 0;
    this.avgPostSalesRating = 0;
    this.setRfpsList();
  }

  getCompanyData() {
    this.masterService.getCompanyDtlById(this.mFactory.getCompanyId()).then(result => {
      this.companyInfo = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
  }

  getCompanyReview() {
    let that = this;
    this.masterService.getCompanyReviews(this.mFactory.getCompanyId()).then(result => {
      // console.log('compnay data =', result.data);
      this.companyReviews = result.data;

      this.overAllSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'overall';
      });
      // console.log(' this.overAllSales data =', this.overAllSales);

      this.sales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'sales';
      });
      that.totalSalesRating =0;
      this.sales.map(function (obj , index) {
        that.totalSalesRating = that.totalSalesRating + obj.experience;
      });
      // console.log(' this.sales data =', this.sales);
      this.preSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'preSales';
      });
      that.totalPreSalesRating = 0;
      this.preSales.map(function (obj, index) {
        that.totalPreSalesRating = that.totalPreSalesRating + obj.experience;
      });
      // console.log(' this.preSales data =', this.preSales);
      this.postSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'postSales';
      });
      this.totalpostSalesRating = 0;
      this.postSales.map(function (obj , index) {
        that.totalpostSalesRating = that.totalpostSalesRating + obj.experience;
      });
      that.preSales.length && (that.avgpreSalesRating = that.totalPreSalesRating/this.preSales.length);
      that.sales.length && (that.avgSalesRating = that.totalSalesRating/this.sales.length);
      that.postSales.length && (that.avgPostSalesRating = that.totalpostSalesRating/this.postSales.length);
      that.avgpreSalesRating = parseInt(that.avgpreSalesRating);
      that.avgSalesRating = parseInt(that.avgSalesRating);
      that.avgPostSalesRating = parseInt(that.avgPostSalesRating);
      console.log(' this.postSales data =', this.postSales);
    })
      .catch(error => {
        console.error('Error occurred while getting company Reviews from server', error);
      });
  }
  loadOverallReview (){
    this.$rootScope.tabFlag = 'overall';
    this.$state.go('companyProfile.overall');
  }
  setRfpsList() {
    this.$http.get('/api/rfps')
      .then(response => {
        this.rfpsList = response.data;
        return this.rfpsList
      })
      .then(() => {
        return this.Auth.getCurrentUser();
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId;
      })
      .then(id => {
        this.rfpsList = this.rfpsList.filter(function (rfp) {
          return !rfp.postedBy ? false : rfp.postedBy._id.toString() === id;
        });
        console.log("rfpsList :"+angular.toJson(this.rfpsList));
      });
  }
}

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {masterService} from '../../../services/master/master.service';
import companyResponseController from '../companyResponse/companyResponse.controller';

export default class SalesController {
  /*@ngInject*/
  constructor($http, mFactory, $uibModal) {
    this.mFactory = mFactory;
    this.$uibModal = $uibModal;
    this.masterService = new masterService($http);
    this.getCompanyReview();
  }

  getResponse(rvw) {
    let that = this;
    that.$uibModal.open({
      template: require('../companyResponse/companyResponse.html'),
      controller: companyResponseController,
      controllerAs: '$ctrl',
      size: 'sm',
      resolve:{
        userObject:rvw
      }
    });
  }
  getCompanyReview() {
    let that = this;
    this.masterService.getCompanyReviews(this.mFactory.getCompanyId()).then(result => {
      // console.log('compnay data =', result.data);
      this.companyReviews = result.data;
      this.companyReviews.map(function (obj,index) {
        if(obj.user) {
          that.masterService.getUserProfile(obj.user).then(userResult => {
            that.companyReviews[index].userDetails = userResult.data;
          });
        }
        // console.log('companyReviews :' + angular.toJson(that.companyReviews));
      });
      this.overAllSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'overall';
      });
      console.log(' this.overAllSales data =', this.overAllSales);

      this.sales = _.filter(this.companyReviews, function (companyReview) {

        return companyReview.reviewType == 'sales';
      });
      console.log(' this.sales data =', this.sales);
      this.preSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'preSales';
      });
      console.log(' this.preSales data =', this.preSales);
      this.postSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'postSales';
      });
      console.log(' this.postSales data =', this.postSales);
    })
      .catch(error => {
        console.error('Error occurred while getting company Reviews from server', error);
      });
  }
}


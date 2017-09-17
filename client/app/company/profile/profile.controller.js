'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');

import {masterService} from '../../services/master/master.service';
export default class ProfileController {
  /*@ngInject*/
  constructor($http, $location, mFactory, $rootScope, $scope) {
    this.$scope = $scope;
    this.$location = $location;
    this.mFactory = mFactory;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.masterService = new masterService($http);
    this.mFactory.setCompanyId(this.$location.search().id);
    this.getCompanyData();
    this.getCompanyReview();
    this.totalRvwRating = 0;
    this.avgReviewRating = 0;
    let that = this;
    this.$scope.$on('$stateChangeStart', function (event, next, nextParams, current) {
      switch (next.name) {
        case 'companyProfile.overall':
          that.tabFlag = 'overall';
          break;

        case 'companyProfile.postSales':
          that.tabFlag = 'post';
          break;

        case 'companyProfile.preSales':
          that.tabFlag = 'pre';
          break;

        case 'companyProfile.sales':
          that.tabFlag = 'sales';
          break;

        case 'companyProfile.rfps':
          that.tabFlag = 'rfps';
          break;

        case 'companyProfile.about':
          that.tabFlag = 'about';
          break;
      }
    });
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
      this.companyReview = result.data;
      this.companyReview.map(function (obj, index) {
        that.totalRvwRating = that.totalRvwRating + obj.experience;
      });
      this.companyReview.length && (that.avgReviewRating = that.totalRvwRating / this.companyReview.length );
      that.avgReviewRating = parseInt(that.avgReviewRating);
    })
      .catch(error => {
        console.error('Error occurred while getting company Reviews from server', error);
      });
  }

  fileChangeEvent(fileInput) {
    this.file = fileInput;
    var formaData = new FormData();
    formaData.append('file', this.file);
    formaData.append('companyID', this.companyInfo._id);
    this.$http.post('/api/uploads/company', formaData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined},
      file: this.file
    }).then(result => {
      if (result.status === 200 && result.data.error === false) {
        this.profileImage = '';
        this.profileImage = result.data.url;
      } else {
        this.profileImage = '';
      }
    });
  }


}

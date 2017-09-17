'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './review.routes';
import {masterService} from '../../services/master/master.service';
import _ from 'lodash';

export class ReviewComponent {
  companies = [];
  searchData = [];
  selectedCompany = '';
  reviewCount =[];
  /*@ngInject*/
  constructor($http, $state, $scope, $location, $window,mFactory,Auth) {
    this.$scope = $scope;
    this.$state = $state;
    this.$location = $location;
    this.Auth = Auth;
    this.masterService = new masterService($http);
    this.result = '';
    this.$scope.type = 'Company';
    this._mFactory = mFactory;
    this.showPage = true;
    this.Auth=Auth;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCompanies();
    this.checkSession();
    this.showButtons=true;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.getCompanies();
    this. getCurrentUser();
    this.checkSession();

    this.$scope.onSelect = function ($item) {
      this.selectedCompany = $item;
    };
  }

  checkSession() {
    if(this.isLoggedIn()) {
      this.showButtons=true;
    } else {
      this.showButtons=false;
    }
  }

  getCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUser = result;
      if(this.currentUser.followedCompanies !== undefined && this.currentUser.followedCompanies.length !== 0){
        this.getFollowedCompanies(this.currentUser.followedCompanies);
      }
    })
      .catch(error => {
        console.error('Error occurred while getting UserId from server' + error);
      });
  }

  getFollowedCompanies(folCompArr) {
    this.masterService.getFollowedCompanies(folCompArr).then(result => {
      if(result.data.length !== 0) {
        this.comData = result.data;
      } else {
      }
    })
      .catch(error => {
        console.error('Error occurred while getting user profile from server' + error);
      });
  }

  checkObj(obj) {
    if(_.indexOf(_.map(this.comData, '_id'), obj._id) === -1) {
      this.follow = false;
      return this.follow;
    } else {
      this.follow = true;
      return this.follow;
    }
  }

  followCompany(index) {
    this.follow = true;
    let self=this;
    let ComId = this.searchData[index]._id;
    let newArr = this.currentUser.followedCompanies;
    if(newArr.indexOf(ComId) === -1) newArr.push(ComId);
    this.masterService.addInfo({followedCompanies: newArr}).then(result => {
      console.log(result);
      for(var i =0;i<newArr.length;i++)
      {
        self.checkObj({ _id : newArr[i] });
      }
    })
      .catch(error => {
        console.log("Error occurred while getting companies from server", error);
      });
  }

  unfollowCompanies(index) {
    let self=this;

    let newComArray = this.currentUser.followedCompanies;
    newComArray = newComArray.filter(val => val !== this.searchData[index]._id);
    this.masterService.addInfo({followedCompanies: newComArray}).then(result => {
      console.log(result);
      for(var i =0;i<newComArray.length;i++)
      {
        self.checkObj({ _id : newComArray[i] });
      }
    })
      .catch(error => {
        console.error('Error occurred while removing company from user record' + error);
      });
  }

  callCompanyProfile(id) {
    let url = '/profile?id=' + id;
    window.location.href=url;
  }

  openWriteReview() {
    this.$state.go('writeReview');
  }

  getResultedData(searchTextvalue, Typevalue) {
    if (searchTextvalue === '') this.showPage = true;
    if (searchTextvalue != null && Typevalue != null) {
      this.masterService.getSearchResults(searchTextvalue, Typevalue).then(result => {
        this.searchData = result.data;
        for(var i =0;i<this.searchData.length;i++)
        {
          this.getCompanyReview(this.searchData[i]._id);
          this._mFactory.setReviewType(this.searchData[i].name);
          if(this.searchData[i].followersCount===undefined){
            this.searchData[i].followersCount=0;
          }
          if(this.searchData[i].rfpsCount===undefined){
            this.searchData[i].rfpsCount=0;
          }
        }
        if (result.data === null) {
          this.searchData = null;
          this.showPage = true;
        }
        else {
          this.showPage = false;
        }
      }).catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
    }
  }

  getPageChanges(searchTextvalue, Typevalue) {
    if (searchTextvalue == '' && Typevalue != null) {
      this.showPage = true;
      this.searchData = null;
    }
  }

  getCompanyReview(id) {
    this.masterService.getCompanyReviews(id).then(result => {
      this.companyReviews = result.data;
      this.reviewCount.push(this.companyReviews.length);
      this.overAllSales = _.filter(this.companyReviews, function (companyReview) {
        return companyReview.reviewType == 'overall';
      });
    })
      .catch(error => {
        console.error('Error occurred while getting company Reviews from server', error);
      });
  }
}

export default angular.module('salesdoorApp.reviews', [uiRouter])
  .config(routes)
  .component('reviews', {
    template: require('./review.html'),
    controller: ReviewComponent,
    controllerAs: 'reviewCtrl'
  })
  .name;

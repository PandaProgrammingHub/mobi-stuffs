'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profile.routes';
import * as _ from 'lodash/collection';
import {masterService} from '../../../app/services/master/master.service';

export class ProfileComponent {
  profile={};
  currentUserId={};
  reviews={};
  userName='';
  userCompany='';
  userDesignation='';
  salesExp=[];
  revLength;
  hiredLength;
  rfpsLength;
  average;
  hiredsList=[];
  rfpsList=[];
  /*@ngInject*/

  constructor($http, $scope, Auth) {
    this.message = 'Hello';
    this.$http = $http;
    this.Auth = Auth;
    this.$scope = $scope;
    this.masterService = new masterService($http);
    this.showReviews = false;
    this.showMoreReviews = false;
    this.showMoreButton = false;
    this.noReviews = false;
    this.noRecommendations = false;
    this.showRecommendation = false;
    this.showRecomAlert = false;
    this.showMoreRecomButton = false;
    this.showMoreRecommendations = false;
    this.showMoreRecomButton = false;
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUser = result;
      this.currentUserId = result._id;
      this.getUserProfile(this.currentUserId);
      this.getUserReviews(this.currentUserId);
      this.getUserRecommendations(this.currentUserId);
      this.setHiredsList();
      this.setRfpsList();
    })
    .catch(error => {
      console.error('Error occurred while getting UserId from server' + error);
    });
  }

  callUserProfile(id) {
    let url = '/profile?id=' + id;
    window.location.href = url;
  }

  getUserProfile(id) {
    this.masterService.getUserProfile(id).then(result => {
      this.profile = result.data;
      this.userName = this.profile.name;
      this.userDesignation = this.profile.designation;
      this.userCompany = this.profile.currentcompany;
      this.salesExp = this.profile.salesexp;
    })
    .catch(error => {
      console.error('Error occurred while getting user profile from server' + error);
    });
  }

  getUserReviews(id) {
    this.masterService.getUserReviews(id).then(result => {
      this.revLength = result.data.length;
      if(this.revLength !== 0) {
        this.reviews = result.data;
        this.showReview = true;
        this.showMoreButton = true;
        this.findAvgReview(this.reviews);
      } else {
        this.noReviews = true;
      }
    })
      .catch(error => {
        console.error('Error occurred while getting user reviews from server' + error);
      });
  }

  findAvgReview(revArr) {
    let thisTotal = 0;
    for(let index in revArr) {
      if(revArr[index].experience !== undefined) thisTotal += revArr[index].experience;
    }
    this.average = (thisTotal / revArr.length);
  }

  showMoreReview() {
    if(this.reviews.length <= 1) {
      this.showAlert = true;
      this.showMoreButton = false;
    } else {
      window.location.href = '/user/reviews';
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  getUserRecommendations(id) {
    this.masterService.getUserRecommendations(id).then(recommendations => {
      if(recommendations.data.length !== 0) {
        this.showRecommendation = true;
        this.recData = recommendations.data;
        this.showMoreRecomButton = true;
      } else {
        this.noRecommendations = true;
      }
    })
      .catch(error => {
        console.error('Error occurred while getting user profile from server' + error);
      });
  }

  showMoreRecommendation() {
    if(this.recData.length <= 1) {
      this.showRecomAlert = true;
      this.showMoreRecomButton = false;
    } else {
      window.location.href = '/user/recommendation';
    }
  }

  closeRecomAlert() {
    this.showRecomAlert = false;
  }

  setHiredsList() {
    this.$http.get('/api/hireds')
      .then(response => {
        this.hiredsList = response.data;
        return this.hiredsList;
      })
      .then(() => {
        return this.Auth.getCurrentUser();
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId;
      })
      .then(id => {
        this.hiredsList = this.hiredsList.filter(function(hired) {
          return !hired.postedBy ? false : hired.postedBy._id.toString() === id;
        });
        this.hiredLength = this.hiredsList.length;
      });
  }

  showMoreHireds() {
    window.location.href = '/user/hired';
  }

  setRfpsList() {
    this.$http.get('/api/rfps')
      .then(response => {
        this.rfpsList = response.data;
        return this.rfpsList;
      })
      .then(() => {
        return this.Auth.getCurrentUser();
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId;
      })
      .then(id => {
        this.rfpsList = this.rfpsList.filter(function(rfp) {
          return !rfp.postedBy ? false : rfp.postedBy._id.toString() === id;
        });
        this.rfpsLength = this.rfpsList.length;
      });
  }

  showMoreRFPS() {
    window.location.href = '/user/userRfp';
  }
}



export default angular.module('salesdoorApp.profile', [uiRouter])
  .config(routes)
  .component('profile', {
    template: require('./profile.html'),
    controller: ProfileComponent,
    controllerAs: 'profileCtrl'
  })
  .name;

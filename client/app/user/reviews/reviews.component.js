'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './reviews.routes';
import {masterService} from '../../../app/services/master/master.service';


export class ReviewsComponent {

  static $inject = ['$http', '$scope', 'Auth'];
  constructor($http, $scope, Auth) {
    this.$scope = $scope;
    this.Auth = Auth;
    this.masterService = new masterService($http);
    this.getCurrentUser();
    this.showMoreFlag = false;
    this.showNoReview = false;
    this.showReview = false;
    this.showAlert = false;
    this.noReviewAlert = false;
    this.removeShowMoreButton = false;
    this.revData = [];
  }

  writeReview() {
    window.location.href = 'review/create';
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(userData => {
      this.getUserReviews(userData._id);
    })
    .catch(error => {
      console.error('Error occurred while getting UserId from server' + error);
    });
  }

  getUserReviews(id) {
    this.masterService.getUserReviews(id).then(userReviews => {
      if(userReviews.data.length !== 0) {
        this.showReview = true;
        this.removeShowMoreButton = true;
        this.revData = userReviews.data;
      } else {
        this.showNoReview = true;
        this.showReview = false;
      }
    })
    .catch(error => {
      console.error('Error occurred while getting user profile from server' + error);
    });
  }

  showMore() {
    if(this.revData.length <= 1) {
      this.removeShowMoreButton = false;
      this.showAlert = true;
    } else {
      this.showMoreFlag = true;
      this.removeShowMoreButton = false;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  deleteReview(remRevObj) {
    this.revData.splice(remRevObj, 1);
    this.masterService.deleteReview(remRevObj._id).then(remReviews => {
    })
      .catch(error => {
        console.error('Error occurred while deleting user review from server' + error);
      });
  }
}

export default angular.module('salesdoorApp.userreviews', [uiRouter])
  .config(routes)
  .component('userreviews', {
    template: require('./reviews.html'),
    controller: ReviewsComponent,
    controllerAs: '$ctrl'
  })
  .name;

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './recommendation.routes';
import {masterService} from '../../../app/services/master/master.service';

export class RecommendationComponent {

  currentUserId={};
  static $inject = ['$http', '$scope', 'Auth'];
  constructor($http, $scope, Auth) {
    this.$scope = $scope;
    this.Auth = Auth;

    this.masterService = new masterService($http);
    this.getCurrentUser();
    this.showMoreFlag = false;
    this.showAlert = false;
    this.showNoRecommendation = false;
    this.showMoreButton = false;
    this.avgRecomRating;
    this.recData = [];
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUserId = result._id;
      this.getUserRecommendations(this.currentUserId);
    })
      .catch(error => {
        console.error('Error occurred while getting UserId from server' + error);
      });
  }

  getUserRecommendations(id) {
    this.masterService.getUserRecommendations(id).then(result => {
      this.recLength = result.data.length;
      if(this.recLength !== 0) {
        this.recData = result.data;
        this.findAvgRecom(this.recData);
        this.showMoreButton = true;
      } else {
        this.showNoRecommendation = true;
        this.showMoreButton = false;
      }
    })
    .catch(error => {
      console.error('Error occurred while getting user profile from server' + error);
    });
  }


  findAvgRecom(recArr) {
    let thisTotal = 0;
    for(let index in recArr) {
      if(recArr[index].recommendedRtaings !== undefined) thisTotal += recArr[index].recommendedRtaings;
    }
    this.avgRecomRating = Math.round(thisTotal / recArr.length);
    console.log(this.avgRecomRating);
  }

  showMore() {
    if(this.recData.length <= 3) {
      this.showAlert = true;
      this.showMoreButton = false;
    } else {
      this.showMoreFlag = true;
      this.showMoreButton = false;

    }
  }

  closeAlert() {
    this.showAlert = false;
  }
}

export default angular.module('salesdoorApp.recommendation', [uiRouter])
  .config(routes)
  .component('recommendation', {
    template: require('./recommendation.html'),
    controller: RecommendationComponent,
    controllerAs: '$ctrl'
  })
  .name;

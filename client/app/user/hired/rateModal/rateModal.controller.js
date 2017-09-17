'use strict';
import {masterService} from '../../../services/master/master.service';

export default class RateModalController {
  /*@ngInject*/
  constructor($uibModalInstance, $http, Auth, mFactory) {
    this.mFactory = mFactory;
    this.$http = $http;
    this.Auth = Auth;
    this.$uibModalInstance = $uibModalInstance;
    this.masterService = new masterService($http);
    this.recommendObj = {};
    this.currentUserId = '';
    this.description = '';
    this.ratingValue = '';
    this.projectTitle = '';
    this.getCurrentUser();
  }

  postRecommendation() {
    this.recommendObj.projectTitle = this.mFactory.getProjectTitle();
    this.recommendObj.recommendedBy = this.currentUserId;
    this.recommendObj.recommendedTo = this.mFactory.getUserIdToRecommend();
    this.recommendObj.recommendedRtaings = this.ratingValue;
    this.recommendObj.recommendDescription = this.description;
    this.recommendObj.recommendedDate = new Date();
    this.saveRecommendation(this.recommendObj);
  }


  saveRecommendation(recObj) {
    this.masterService.saveRecommendation(recObj).then(recResult => {
      if(recResult) {
        console.log('here')
        this.$uibModalInstance.close(true);
      }
    })
      .catch(error => {
        console.error('Error occurred while getting user profile from server' + error);
      });
  }

  closeModal() {
    this.$uibModalInstance.close(true);
  }

  setRating(ratingValue) {
    this.ratingValue = ratingValue;
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUserId = result._id;
    })
    .catch(error => {
      console.error('Error occurred while getting UserId from server', error);
    });
  }


}

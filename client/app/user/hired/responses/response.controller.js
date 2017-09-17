'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import RateModalController from '../rateModal/rateModal.controller';


export default class HiredResponse {
  /*@ngInject*/

  constructor($uibModal, $http, $stateParams, mFactory) {
    this.mFactory = mFactory;
    this.$http = $http;
    this.hiredResponseId = $stateParams.uid;
    this.openRateModal = function(userId) {
      this.mFactory.setUserIdToRecommend(userId);
      $uibModal.open({
        template: require('../rateModal/rateModal.html'),
        controller: RateModalController,
        controllerAs: '$ctrl',
        size: 'md',
      });
    };
  }

  setHired() {
    this.userList = [];
    this.$http.get('/api/hireds/' + this.hiredResponseId)
      .then(response => {
        this.hiredItem = response.data;
        this.mFactory.setProjectTitle(this.hiredItem.projectTitle);
        return this.hiredItem.appliedBy;
      })
      .then(list => {
        for (let user of list) {
          if (user.userId) {
            this.$http.get('/api/users/' + user.userId)
              .then(response => {
                this.userList.push(response.data);
              })
            }
        }
      })
  }

  $onInit() {
    this.setHired();
  }

}

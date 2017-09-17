'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import PostPopupController from '../postPopup/postPopup.controller';

export default class SendHiredController {
  /*@ngInject*/
  constructor($uibModal, $http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.showAllHireds = false;
    this.PostPopUp = function() {
      $uibModal.open({
        template: require('../postPopup/postPopup.html'),
        controller: PostPopupController,
        controllerAs: '$ctrl',
        size: 'md',
      });
    };
  }

  getAll() {
    this.showAllHireds = true;
  }

  setHiredsList() {
    this.$http.get('/api/hireds')
      .then(response => {
        this.hiredsList = response.data;
        return this.hiredsList
      })
      .then(() => {
        return this.Auth.getCurrentUser();
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId
      })
      .then(id => {
        this.hiredsList = this.hiredsList.filter(function(hired) {
          return !hired.postedBy ? false : hired.postedBy._id.toString() === id;
        });
      });
  }

  $onInit() {
    this.setHiredsList();
  }

}

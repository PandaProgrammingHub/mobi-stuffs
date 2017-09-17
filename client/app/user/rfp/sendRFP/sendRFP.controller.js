'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import PostPopupController from './postPopup.controller';

export default class SendRFPController {
  /*@ngInject*/
  constructor($uibModal, $http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.showAllRfps = false;
    this.PostPopUp = function() {
      $uibModal.open({
        template: require('./postRFP.html'),
        controller: PostPopupController,
        controllerAs: '$ctrl',
        size: 'md',
        resolve: {
          flag: true
        }
      });
    };
  }

  getAll() {
    this.showAllRfps = true;
  }

  setRfpsList() {
    this.$http.get('/api/rfps')
      .then(response => {
        this.rfpsList = response.data;
        return this.rfpsList
      })
      .then(() => {
        return this.Auth.getCurrentUser()
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId
      })
      .then(id => {
        this.rfpsList = this.rfpsList.filter( function (rfp) {
          return !rfp.postedBy ? false : rfp.postedBy._id.toString() === id;
        });
      });
  }

  $onInit() {
    this.setRfpsList();
  }



}

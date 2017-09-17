'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import PostPopupController from '../../../user/rfp/sendRFP/postPopup.controller';

import rfpComponent from '../../../company/rfp/rfp.component';
export default class RfpsController {
  /*@ngInject*/
  constructor($uibModal, $http, Auth) {
    this.Auth = Auth;
    this.$http = $http;
    this.$uibModal = $uibModal;
    this.message = 'Hello';
    this.setRfpsList();
  }

  getRfp() {
    this.$uibModal.open({
      template: require('../../../user/rfp/sendRFP/postRFP.html'),
      controller: PostPopupController,
      controllerAs: '$ctrl',
      size: 'md',
      resolve: {
        flag: true
      }
    });
  }

  setRfpsList() {
    this.$http.get('/api/rfps')
      .then(response => {
        this.rfpsList = response.data;
        return this.rfpsList
      })
      .then(() => {
        return this.Auth.getCurrentUser();
      })
      .then(result => {
        this.currentUserId = result._id;
        return this.currentUserId;
      })
      .then(id => {
        this.rfpsList = this.rfpsList.filter(function (rfp) {
          return !rfp.postedBy ? false : rfp.postedBy._id.toString() === id;
        });
        console.log("rfpsList :"+angular.toJson(this.rfpsList));
      });
  }
}


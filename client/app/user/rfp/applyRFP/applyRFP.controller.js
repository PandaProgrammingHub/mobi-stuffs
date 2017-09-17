'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import ShowInterestController from '../showInterest/showInterest.controller';

export default class ApplyRFPController {
  /*@ngInject*/
  constructor($uibModal, $http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.showAllRfps = false;
    this.interestModal = function(rfp) {
      $uibModal.open({
        template: require('../showInterest/showInterest.html'),
        controller: ShowInterestController,
        controllerAs: '$ctrl',
        size: 'md',
        resolve: {
          flag: true,
          rfp: function() {
            return rfp
          }
        }
      });
    };
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
        this.currentUserName = result.name;
        return this.currentUserId
      })
      .then(id => {
        this.rfpsList = this.rfpsList.filter(function (rfp) {
          return rfp.postedBy._id.toString() !== id
        })
        return this.rfpsList;
      })
      .then(list => {
        let updatedRfps = [];
        for (let rfp of list) {
          if (rfp.postedBy) {
            this.$http.get('/api/users/' + rfp.postedBy._id.toString())
              .then(response => {
                rfp.userInfo = response.data;
                updatedRfps.push(rfp);
              });
          }
        }
        this.rfpsList = updatedRfps;
      })
  }

  getAll() {
    this.showAllRfps = true;
  }

  $onInit() {
    this.setRfpsList();
    // this.getCurrentUser();
  }

  alreadyApplied(rfp) {
    if (rfp.appliedBy.length === 0) return false;
    for (let user of rfp.appliedBy) {
      if (user.userId === this.currentUserId) return true
    }
    return false;
  }

  applyToRfp(rfp) {
    this.$http.post('/api/rfps/addApplicant/' + rfp._id,
      {
        userId: this.currentUserId,
        userName: this.currentUserName
      }
    ).then(result => {
      window.location.reload();
    })
  }

}


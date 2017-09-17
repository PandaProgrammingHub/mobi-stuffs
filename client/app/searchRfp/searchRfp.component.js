'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './searchRfp.routes';
import {masterService} from '../services/master/master.service';
import ShowInterestController from '../user/rfp/showInterest/showInterest.controller';

export class SearchRfpComponent {
  noOfResult = 0;
  searchText = "";
  searchResults = [];
  showSearchResults = [];
  location = "";
  hiredCount = [];
  rfpCount = [];
  applyByCount = [];
  reviewsCount = [];
  /*@ngInject*/
  constructor($uibModal, $http, $scope, Auth) {
    this.$scope = $scope;
    this.$http = $http;
    this.Auth = Auth;
    this.$scope.type = 'Rfp';
    this.showPage = true;
    this.showAlert = false;
    this.showDiv = false;
    this.showMoreFlag = false;
    this.masterService = new masterService($http);
    this.isLoggedIn = Auth.isLoggedInSync;
    this.checkSession();
    this.interestModal = function () {
      $uibModal.open({
        template: require('../user/rfp/showInterest/showInterest.html'),
        controller: ShowInterestController,
        controllerAs: '$ctrl',
        size: 'md',
        resolve: {
          flag: true
        }
      });
    };
    this.getCurrentUser();
  }

  checkSession() {
    if(this.isLoggedIn()) {
      this.showButtons=true;
    } else {
      this.showButtons=false;
    }
  }

  showMore() {
    this.showMoreFlag = true;
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUserId = result._id;
    }).catch(error => {
      console.error("Error occurred while getting UserId from server", error);
    });
  }

  alreadyApplied(hired) {
    if (!hired || hired.appliedBy.length === 0) return false;
    for (let user of hired.appliedBy) {
      if (user.userId === this.currentUserId) return true;
    }
    return false;
  }

  applyToRfp(hired, event) {
    this.$http.post('/api/rfps/addApplicant/' + hired._id,
      {
        userId: this.currentUserId,
        userName: this.currentUserName
      }
    ).then( result => {
      var target = event.target || event.srcElement;
      target.innerHTML = "Applied";
    })
  }

  searchBy(searchText, type) {
    this.searchRfpResult(searchText, type);
  }

  closeAlert() {
    this.showAlert = false;
    this.showPage = true;
  }

  onChange(searchText) {
    if (searchText == '') {
      this.showSearchResults = null;
      this.showView = false;
      this.showPage = true;
      this.showDiv = false;
    }
  }

  searchRfpResult(searchText, type) {
    let searchTx = (searchText)?searchText : "";
    let Rest;
    if (searchText === '') this.showPage = true;
    this.masterService.searchHiredResult(searchTx,type).then(result => {
      Rest = result.data;
      if(result.data === null)
      {
        this.showSearchResults = null;
        this.showView = false;
        this.showPage = true;
      }
      else {
        this.searchResults = result.data;
        this.showSearchResults = result.data;
        this.noOfResult = Rest.length;
        this.showView = true;
        this.showDiv = true;
        this.showPage = false;
        this.showAlert = false;

        for (var i = 0; i < result.data.length; i++) {
          this.$http.get('/api/hireds/countForUser/' + this.searchResults[i].postedBy._id,
          ).then(result => {
            console.log('hireds count', result.data);
            this.hiredCount.push(result.data);
          })

          this.$http.get('/api/rfps/countForUser/' + this.searchResults[i].postedBy._id,
          ).then(result => {
            if (result.status == 200) {
              if (result.data.length != undefined) {
                this.rfpCount.push(result.data);
              } else {
                this.rfpCount.push(0);
              }
            } else {
              this.rfpCount.push(0);
            }
          })
          this.$http.get('/api/reviews/countForUser/' + this.searchResults[i].postedBy._id,
          ).then(result => {
            console.log('reviews count', result.data);
            this.reviewsCount.push(result.data);
          })
          this.applyByCount.push(result.data[i].appliedBy.length);
        }
        if (Rest.length == 0) {
          this.showAlert = true;
          this.showDiv = false;
        }
      }
    }).catch(error => {
      console.error("Error occurred while getting searchResult from server", error);
    })
      .catch(error => {
        console.error('Error occurred while getting searchResult from server', error);
      });
  }

}
export default angular.module('salesdoorApp.searchRfp', [uiRouter])
  .config(routes)
  .component('searchRfp', {
    template: require('./searchRfp.html'),
    controller: SearchRfpComponent,
    controllerAs: 'searchRfpCtrl'
  })
  .name;

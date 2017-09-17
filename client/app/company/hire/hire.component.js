'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './hire.routes';
import {masterService} from '../../services/master/master.service';

export class HireComponent {
  noOfResult = 0;
  searchText = "";
  searchResults = [];
  showSearchResults = [];
  hiredCount = [];
  rfpCount = [];
  applyByCount = [];
  reviewsCount = [];
  location = "";
  /*@ngInject*/
  constructor($scope, $http, Auth) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.Auth = Auth;
    this.$scope.type = 'Hired';
    this.showPage = true;
    this.showAlert = false;
    this.showDiv = false;
    this.$http = $http;
    this.$scope.starDisabled=true;
    this.showMoreFlag = false;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.masterService = new masterService($http);
    this.getCurrentUser();
    this.checkSession();
  }

  checkSession() {
    if(this.isLoggedIn()) {
      this.showButtons=true;
    } else {
      this.showButtons=false;
    }
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

  takeToUser(id){
    let url = '/userpublic?id=' + id;
    window.location.href = url;
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

  applyToHired(hired, event) {

    this.$http.post('/api/hireds/addApplicant/' + hired._id,
      {
        userId: this.currentUserId,
        userName: this.currentUserName
      }
    ).then(result => {
      var target = event.target || event.srcElement;
      target.innerHTML = "Applied";
    })
  }

  searchBy(searchText, type) {
    this.searchHiredResult(searchText, type);
  }

  closeAlert() {
    this.showAlert = false;
    this.showPage = true;
  }

  onChange(searchText) {
    if (searchText == '') {
      this.showSearchResults = null;
      this.showPage = true;
      this.showDiv = false;
      this.showAlert = false;
    }
  }

  searchHiredResult(searchText, type) {
    let searchTx = (searchText) ? searchText : "";
    let Rest;
    if (searchText === '') this.showPage = true;
    if (searchText != '') {
      this.masterService.searchHiredResult(searchTx, type).then(result => {
        Rest = result.data;

        if (result.data === null) {
          this.showSearchResults = null;
          this.showPage = true;
        }
        else {

          this.searchResults = result.data;
          this.showSearchResults = result.data;
          this.noOfResult = Rest.length;
          this.showDiv = true;
          this.showPage = false;

          for (var i = 0; i < result.data.length; i++) {
            this.$http.get('/api/hireds/countForUser/' + this.searchResults[i].postedBy._id,
            ).then(result => {
              this.hiredCount.push(result.data);
            })

            this.$http.get('/api/rfps/countForUser/' + this.searchResults[i].postedBy._id,
            ).then(result => {
              if (result.status == 200) {
                if(result.data.length !=undefined)
                {
                  this.rfpCount.push(result.data);
                }else{
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
          else {

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
}

export default angular.module('salesdoorApp.hireMe', [uiRouter])
  .config(routes)
  .component('hireMe', {
    template: require('./hire.html'),
    controller: HireComponent,
    controllerAs: 'hireCtrl'
  })
  .name;

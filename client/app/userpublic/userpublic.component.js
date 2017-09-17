'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './userpublic.routes';
import * as _ from 'lodash/collection';
import {masterService} from '../services/master/master.service';

export class UserpublicComponent {
  profile={};
  userName='';
  userCompany='';
  userDesignation='';
  userFollowedCompanies = [];
  resultFollowedCompanies = [];
  typeOfSales = '';
  products = [];
  location = [];
  hireds = [];
  /*@ngInject*/

  constructor($http, $scope, Auth, $state) {
    this.$scope = $scope;
    this.message = 'Hello';
    this.masterService = new masterService($http);
    this.Auth = Auth;
    this.result = '';
    this.reviewResult = [];
    this.showRecom = false;
    this.recommendResult=[];
    this.$state = $state;
    this.$http = $http;
    this.removeViewMoreButton = false;
    this.showMoreFlag = false;
    this.showNoReview = false;
    this.showNoRfp = false;
    this.showNoReview = false;
    this.showRfp = false;
    this.showNoCompany = false;
    this.showReview = false;
    this.showAlert = false;
    this.removeShowMoreButton = false;
    this.currentUserId = this.$state.params.id;
    this.getCurrentUser();
    this.getCurrentReviews();
    this.getHireds();
  }

  getCurrentReviews() {
    this.masterService.getUserReviews(this.currentUserId).then(result=> {
      if(result.data.length !== 0) {
        this.showReview = true;
        this.removeShowMoreButton = true;
        this.reviewResult = result.data;
      } else {
        this.showNoReview = true;
        this.showReview = false;
      }
    });
  }
  showMore() {
    if(this.reviewResult.length <= 1) {
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
  getCurrentUser() {

    this.getUserProfile(this.currentUserId);
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
    ).then( result => {
      var target = event.target || event.srcElement;
      target.innerHTML = "Applied";
    })
  }
  getUserProfile(id)
  {
    this.masterService.getUserProfile(id).then(result=>{
      this.userName = null;
      this.userCompany=null;
      this.userDesignation=null;
      this.userFollowedCompanies = null;
      this.profile = result.data;
      this.userName = this.profile.name;
      this.userDesignation=this.profile.designation;
      this.userCompany = this.profile.currentcompany;
      this.userFollowedCompanies = this.profile.followedCompanies;
      this.companies = this.profile.companies;
      this.typeOfSales = this.profile.typeofsales;
      this.masterService.getUserRecommendations(this.currentUserId)
        .then(res => {
          this.recommendResult = res.data;
          if(this.recommendResult.length !== 0){
            this.showRecom = true;
          }
        })
        .catch(err => console.log(err));
      this.masterService.getRfpById(this.currentUserId)
        .then(res => {
          if(res.data.length !== 0) {
            this.showRfp = true;
            this.removeViewMoreButton = true;
            if(res.data.length === 1){
              this.removeViewMoreButton = false;
            }
            this.resultRfpById = res.data;
          } else {
            this.showNoRfp = true;
            this.showRfp = false;
          }
        })
        .catch(err=> console.log(err));
      this.masterService.getFollowedCompanies(this.userFollowedCompanies).then(result => {
        if(result.data.length == 0) {
          this.showNoCompany = true;
        }
        this.resultFollowedCompanies = result.data;
      })
        .catch(err => console.log(err));
    })
      .catch( error=>{
      console.error("Error occurred while getting user profile from server", error);
    });
  }

  getHireds() {
    this.masterService.getPublicUserHired(this.currentUserId ).then(result=>{
      this.hireds=result.data;
    }).catch(err => console.log(err))
  }
}

export default angular.module('salesdoorApp.userpublic', [uiRouter])
  .config(routes)
  .component('userpublic', {
    template: require('./userpublic.html'),
    controller: UserpublicComponent,
    controllerAs: 'userpublicCtrl'
  })
  .name;

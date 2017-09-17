'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
const _ = require('lodash');

import routes from './companies.routes';
import {masterService} from '../../../app/services/master/master.service';

export class CompaniesComponent {
  static $inject = ['$http', '$scope', 'Auth', '$location'];
  constructor($http, $scope, Auth, $route, $location) {
    this.$scope = $scope;
    this.Auth = Auth;
    this.$location = $location;
    this.masterService = new masterService($http);
    this.getCurrentUser();
    this.getAllCompanies();
    this.showMoreFlag = false;
    this.ShowMoreButton = false;
    this.showCompanies = false;
    this.showNoCompanies = false;
    this.showSearchCompanies = false;
    this.comData = [];
    this.currentUser = {};
    this.toggleText = '';
  }

  getAllCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.allCompanies = result.data;
    })
    .catch(error => {
      console.error('Error occurred while getting companies from server', error);
    });
  }

  showSearchCompany() {
    this.showCompanies = false;
    this.showSearchCompanies = true;
    this.ShowMoreButton = false;
  }

  getCurrentUser() {
    this.Auth.getCurrentUser().then(result => {
      this.currentUser = result;
      if(this.currentUser.followedCompanies !== undefined && this.currentUser.followedCompanies.length !== 0){
        this.getFollowedCompanies(this.currentUser.followedCompanies);
      } else {
        this.showCompanies = false;
        this.showNoCompanies = true;
      }
    })
    .catch(error => {
      console.error('Error occurred while getting UserId from server' + error);
    });
  }

  getFollowedCompanies(folCompArr) {
    this.masterService.getFollowedCompanies(folCompArr).then(result => {
      if(result.data.length !== 0) {
        this.ShowMoreButton = true;
        this.comData = result.data;
        this.showCompanies = true;
      } else {
        this.showCompanies = false;
      }
    })
      .catch(error => {
        console.error('Error occurred while getting user profile from server' + error);
      });
  }

  checkObj(obj) {
    if(_.indexOf(_.map(this.comData, '_id'), obj._id) === -1) {
      this.follow = false;
      this.toggleText = 'follow';
      return this.follow;
    } else {
      this.follow = true;
      this.toggleText = 'unfollow';
      return this.follow;
    }
  }

  searchCompOpn(index, opCase) {
    if(opCase === 'follow') {
      console.log('before ' + this.toggleText)
      this.toggleText = 'unfollow';
      console.log('after ' + this.toggleText)
      this.followCompany(index);
    } else {
      this.toggleText = 'follow';
      this.unfollowCompanies(index, 'unfollowSSC');
    }
  }

  followCompany(index) {
    let ComId = this.allCompanies[index]._id;
    let newArr = this.currentUser.followedCompanies;
    if(newArr.indexOf(ComId) === -1) {
      newArr.push(ComId);
    }
    this.masterService.addInfo({followedCompanies: newArr}).then(result => {
    })
    .catch(error => {
      console.log('Error occurred while getting companies from server', error);
    });
  }

  unfollowCompanies(index, callSource) {
    if(callSource === 'unfollowReg') {
      let newComArray = this.currentUser.followedCompanies;
      // let ind = newComArray.indexOf(this.comData[index]._id);
      newComArray = newComArray.filter(val => val !== this.comData[index]._id);
      this.comData.splice(index, 1);
      this.masterService.addInfo({followedCompanies: newComArray}).then(result => {


      })
        .catch(error => {
          console.error('Error occurred while removing company from user record' + error);
        });
    } else {
      let newComArray = this.currentUser.followedCompanies;
      // let ind = newComArray.indexOf(this.allCompanies[index]._id);
      newComArray = newComArray.filter(val => val !== this.allCompanies[index]._id);
      this.allCompanies.splice(index, 1);
      this.masterService.addInfo({followedCompanies: newComArray}).then(result => {
      })
        .catch(error => {
          console.error('Error occurred while removing company from user record' + error);
        });

    }
  }

  showMore() {
    if(this.comData.length <= 4) {
      this.ShowMoreButton = false;
      this.showAlert = true;
    } else {
      this.showMoreFlag = true;
      this.ShowMoreButton = false;
    }
  }

  closeAlert() {
    this.showAlert = false;
  }

  callCompanyProfile(id) {
    let url = '/profile?id=' + id;
    window.location.href = url;
  }
}

export default angular.module('salesdoorApp.companies', [uiRouter])
  .config(routes)
  .component('companies', {
    template: require('./companies.html'),
    controller: CompaniesComponent,
    controllerAs: '$ctrl'
  })
  .name;

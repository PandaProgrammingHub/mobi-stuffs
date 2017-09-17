'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './followCompanies.routes';
import {masterService} from "../services/master/master.service";

export class FollowCompaniesComponent {
  companies=[];
  selectedCompanies=[];
  checkFlags=[];
  selectedIndex = 0;
  status='';
  /*@ngInject*/
  constructor($state,$http,Auth,$scope) {
    this.masterService = new masterService($http);
    this.$state = $state;
    this.$scope=$scope;
    this.Auth=Auth;
    this.showAlert = false;
    this.showMoreFlag = false;

    this.getCompanies();
  }
  getCompanies() {

    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
      this.updateCompanies();
    }).catch(error => {
      console.error("Error occurred while getting companies from server", error);
    });

  }
  closeAlert(index)
  {
    this.$scope.alerts.splice(index, 1);
  }
  showMore() {
    this.showMoreFlag = true;
  }
  updateCompanies() {
    var mSelf=this;
    for (var index=0; index<this.companies.length; index++) {
      this.checkFlags[index]=false;
      this.selectedCompanies[index]=null;
    }
    var currentUser=this.Auth.getCurrentUser();
    currentUser.then(function (userData) {
      let comp=userData.followedCompanies;
      if(comp!== undefined && comp.length>0)
      {
        for (var i = 0; i < mSelf.companies.length; i++) {
          // we want to know if a[i] is found in b
          for (var j = 0; j < comp.length; j++) {
            if (mSelf.companies[i]._id == comp[j]) {
              mSelf.checkFlags[i]=true;
              mSelf.selectedCompanies[i]=mSelf.companies[i]._id;
              break;
            }
          }
        }

      }
    }).catch(function (err) {
      console.log(err)
    });
  }
  goToGroups() {
    this.$state.go('profile');
  }
  onCompanySelected=function ($index) {
    if(this.showAlert) this.showAlert=false;
    if(this.checkFlags[$index])
      this.checkFlags[$index]= false;
    else
      this.checkFlags[$index] = true;
  }
  followCompany = function(){
    for(var i =0;i<this.companies.length;i++)
    {
      if(this.checkFlags[i]) this.selectedCompanies[i]=this.companies[i]._id;
      else this.selectedCompanies[i]=null;
    }

    this.selectedCompanies=this.selectedCompanies.filter(function(val) { return val !== null; });
    if(this.selectedCompanies.length === 0){
      this.showAlert = true;
      // this.$scope.alerts.push({type: 'danger', msg: 'Need to Follow Company'});
    } else {
      this.masterService.addInfo({'followedCompanies':this.selectedCompanies}).then(result => {
        this.goToGroups();
      }).catch(error => {
        console.log("Error occurred while getting companies from server", error);
      });
    }
  }

  closeAlert(){
    this.showAlert = false;
  }

}

export default angular.module('salesdoorApp.followCompanies', [uiRouter])
  .config(routes)
  .component('followCompanies', {
    template: require('./followCompanies.html'),

    controller: FollowCompaniesComponent,
    controllerAs: 'followCompaniesCtrl'
  })
  .name;

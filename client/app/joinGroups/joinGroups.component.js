'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './joinGroups.routes';
import {masterService} from '../services/master/master.service';

export class JoinGroupsComponent {
  groups=[];
  selectedGroups=[];
  checkFlags=[];
  selectedIndex = 0;


  /*@ngInject*/
  constructor($state,$http,Auth) {
    this.masterService = new masterService($http);
    this.$state = $state;
    this.Auth=Auth;
    this.getGroups();
  }
  getGroups() {
    this.masterService.getGroups().then(result => {
      this.groups = result.data;
      this.updateGroups();
    }).catch(error => {
      console.error("Error occurred while getting companies from server", error);
    });
  }
  goToProfile() {
    this.$state.go('profile');
  }
  updateGroups() {
    var mSelf=this;
    for (var index=0; index<this.groups.length; index++) {
      this.checkFlags[index]=false;
      this.selectedGroups[index]=null;
    }
    var currentUser=this.Auth.getCurrentUser();
    currentUser.then(function (userData) {
      let jgroups=userData.joinedGroups;
      if(jgroups!== undefined && jgroups.length>0)
      {
        for (var i = 0; i < mSelf.groups.length; i++) {
          // we want to know if a[i] is found in b
          for (var j = 0; j < jgroups.length; j++) {
            if (mSelf.groups[i]._id == jgroups[j]) {
              // we have found a[i] in b, so we can stop searching
              // match = true;
              mSelf.checkFlags[i]=true;
              mSelf.selectedGroups[i]=mSelf.groups[i]._id;
              break;
            }
            // if we never find a[i] in b, the for loop will simply end,
            // and match will remain false
          }
        }
      }
    }).catch(function (err) {
      console.log(err)
    });
  }
  onGroupSelected=function ($index) {
    if(this.checkFlags[$index])
      this.checkFlags[$index]= false;
    else
      this.checkFlags[$index] = true;
  }
  joinGroup = function(){
    for(var i =0;i<this.groups.length;i++)
    {
      if(this.checkFlags[i]) this.selectedGroups[i]=this.groups[i]._id;
      else this.selectedGroups[i]=null;
    }
    this.selectedGroups=this.selectedGroups.filter(function(val) { return val !== null; });
    this.masterService.addInfo({'joinedGroups':this.selectedGroups}).then(result => {
      this.goToProfile();
    }).catch(error => {
      console.log("Error occurred while getting companies from server", error);
    });
  }
}

export default angular.module('salesdoorApp.joinGroups', [uiRouter])
  .config(routes)
  .component('joinGroups', {
    template: require('./joinGroups.html'),
    controller: JoinGroupsComponent,
    controllerAs: 'joinGroupsCtrl'
  })
  .name;

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class ApplyHiredController {
  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
    this.showAllHireds = false;
  }

   setHiredsList() {
    this.$http.get('/api/hireds')
      .then(response => {
        this.hiredsList = response.data;
        return this.hiredsList
      })
      .then(() => {
        return this.Auth.getCurrentUser()
      })
      .then(result => {
        this.currentUserId = result._id;
        this.currentUserName = result.name;
        return this.currentUserId
      })
      .then(id => {
        this.hiredsList = this.hiredsList.filter(function (hired) {
          return hired.postedBy._id.toString() !== id
        })
        return this.hiredsList;
      })
      .then(list => {
        let updatedHireds = [];
        for (let hired of list) {
          if (hired.postedBy) {
            this.$http.get('/api/users/' + hired.postedBy._id.toString())
              .then(response => {
                  hired.userInfo = response.data;
                updatedHireds.push(hired);
              })
            }
          }
          this.hiredsList = updatedHireds;
      })
  }

  getAll() {
    this.showAllHireds = true;
  }

  $onInit() {
    this.setHiredsList();
    // this.getCurrentUser();
  }

  alreadyApplied(hired) {
    if (!hired || hired.appliedBy.length === 0) return false;
    for (let user of hired.appliedBy) {
      if (user.userId === this.currentUserId) return true;
    }
    return false;
  }

  applyToHired(hired) {
    this.$http.post('/api/hireds/addApplicant/' + hired._id,
      {
        userId: this.currentUserId,
        userName: this.currentUserName
      }
    ).then( result => {
      window.location.reload();
    })
  }

}

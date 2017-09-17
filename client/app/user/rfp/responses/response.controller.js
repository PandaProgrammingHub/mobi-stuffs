'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

export default class ResponseController {
  /*@ngInject*/

  constructor($http, $stateParams) {
    this.$http = $http;
    this.rfpResponseId = $stateParams.uid;
    console.log($stateParams);
  }

  setRfp() {
    this.userList = [];
    this.$http.get('/api/rfps/' + this.rfpResponseId)
      .then(response => {
        this.rfpItem = response.data;
        return this.rfpItem.appliedBy
      })
      .then(list => {
        for (let user of list) {
          if (user.userId) {
            this.$http.get('/api/users/' + user.userId)
              .then(response => {
                this.userList.push(response.data);
              })
          }
        };
      })
  }

  $onInit() {
    this.setRfp();
  }
}

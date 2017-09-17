'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './additionalinfotwo.routes';

export class AdditionalinfotwoComponent {
  /*@ngInject*/
  constructor($state, $http) {
    this.message = 'Hello';
    this.integerval = /^\d*$/;
    this.$state = $state;
    this.$http = $http;
    this.user = {};
    this.profileImage = '../../../assets/images/proimg.jpg';
  }

  saveUserInfo(status) {
    if (status == false) {
      this.$http.post('/api/users/additionalinfo', this.user);
      this.$state.go('writereviewsignup');
    }
  }

  fileChangeEvent(fileInput) {
    this.file = fileInput;
    var formaData = new FormData();
    formaData.append('file', this.file);
    this.$http.post('/api/uploads/', formaData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined},
      file: this.file
    }).then(result => {
      if(result.status === 200 && result.data.error === false) {
        this.profileImage = result.data.url;
        this.user.profileImage = result.data.url;
      }
    });
  }
}
export default angular.module('salesdoorApp.additionalinfotwo', [uiRouter])
  .config(routes)
  .component('additionalinfotwo', {
    template: require('./additionalinfotwo.html'),
    controller: AdditionalinfotwoComponent,
    controllerAs: 'additionalinfotwoCtrl'
  })
  .name;

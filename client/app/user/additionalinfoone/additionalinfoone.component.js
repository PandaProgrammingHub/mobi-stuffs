'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './additionalinfoone.routes';
import {masterService} from '../../services/master/master.service';

export class AdditionalinfooneComponent {
  /*@ngInject*/
  constructor($state, $http) {
    this.$http = $http;
    this.$state = $state;
    this.masterService = new masterService($http);
    this.getCompanies();
    this.getLocations();
  }

  page2() {
    this.$state.go('additionalinfotwo');
  }

  saveAdditionalInfo(status) {
    if(status==false)
    {
      this.$http.post('/api/users/additionalinfo', this.user);
      this.page2();
    }
  }

  getCompanies() {
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server',error);
      });
  }

  getLocations() {
    this.masterService.getLocations().then(result => {
      this.locations = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server',error);
      });
  }

}

export default angular.module('salesdoorApp.additionalinfoone', [uiRouter])
  .config(routes)
  .component('additionalinfoone', {
    template: require('./additionalinfoone.html'),
    controller: AdditionalinfooneComponent,
    controllerAs: 'additionalinfooneCtrl'
  })
  .name;

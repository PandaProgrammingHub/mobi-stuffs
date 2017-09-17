'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './searchHired.routes';
import {masterService} from '../services/master/master.service';

export class SearchHiredComponent {
  noOfResult        = 0;
  searchText        = "";
  searchResults     = [];
  showSearchResults = [];
  location = "";
  /*@ngInject*/
  constructor($http, $scope) {
    this.message = 'Hello';
    this.$scope = $scope;
    this.$scope.type = 'Hired';
    this.masterService = new masterService($http);
    this.searchHiredResult(this.searchText);
  }
  searchBy(searchText,type){
    this.searchHiredResult(searchText,type);
  }
  onChange(searchText)
  {
    if(searchText == '')
    {
      this.showSearchResults = null;
    }
  }
  searchHiredResult(searchText,type) {
    let searchTx = (searchText)?searchText : "";
    let Rest;
    this.masterService.searchHiredResult(searchTx,type).then(result => {
      Rest = result.data;
      if(result.data === null)
      {
        this.showSearchResults = null;
      }
      else
      {
        this.searchResults = result.data;
        this.showSearchResults = result.data;
        this.noOfResult = Rest.length;
      }

    }).catch(error => {
      console.error("Error occurred while getting searchResult from server", error);
    })
    .catch(error => {
      console.error('Error occurred while getting searchResult from server', error);
    });
  }
}

export default angular.module('salesdoorApp.searchHired', [uiRouter])
  .config(routes)
  .component('searchHired', {
    template: require('./searchHired.html'),
    controller: SearchHiredComponent,
    controllerAs: 'searchHiredCtrl'
  })
  .name;

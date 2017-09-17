'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './hire.routes';
import CreatehireController from '../createmodal/createhire/createhire.controller';
import {environment} from '../../../environments/environment';
import {masterService} from '../../services/master/master.service';


export class HireComponent {
  searchHireList = {
    "projectTitle": '',
    "productCategory": '',
    "location": '',
    "saleStage": ''
  };
  locations = [];
  products = [];
//  '@ngInject';
  constructor(Auth,$state, $uibModal,$scope,$http) {
    this.message = 'Hello';
    this.Auth = Auth;
    this.isAdmin();
    this.masterService = new masterService($http);
    this.getHireLists($scope,$http);
    $scope.noSearchResult = false;
    this.getLocations();
    this.getProducts();

    $scope.viewby;
    $scope.maxSize;
    $scope.currentPage;
    $scope.pageChanged = function(){
      var page  = $scope.currentPage -1;
      var limit = $scope.itemsPerPage;
      var  url=environment.url;
      url=url+'hireds?page='+page+'&limit='+limit;
      return $http.get(url)
        .then(function success(response) {
        $scope.hire =  response.data;
        }).catch(function error(error) {
          return error;
        });
    }

    this.searchHire = function() {
      $scope.noSearchResult = false;
      let obj = this.searchHireList;
      Object.keys(obj).forEach(key => {
      	if (obj[key] === "" || obj[key] === null){
          delete obj[key];
          }
      });
      let searchObj = obj;
      var url = environment.url;
      var len;
      url = url + 'hireds/search';
      return $http.post(url, searchObj)
        .then(function success(response) {
          // console.log(response.data);
          len = Object.keys(response.data).length;
          $scope.hire = response.data;
          $scope.totalItems = response.data.length;
          $scope.itemsPerPage = 10;
          $scope.currentPage = 1;
          $scope.maxSize = 5;
          if(len == 0){
            $scope.noSearchResult = true;
          }
          // return response;
        }).catch(function error(error) {
          return error;
        });
}

    this.createHire = function(){
    var modalInstance =  $uibModal.open({
        template: require('../createmodal/createhire/createHire.html'),
        controller: CreatehireController,
        controllerAs: 'createHireCtrl',
      });
    modalInstance.result.then(function(submitVar) {
      if(typeof submitVar !== 'undefined'){
        $scope.hire.push(submitVar);
        // $scope.postHire(submitVar);
      }
  });
    };
    this.deleteHire = function(id,projectTitle,index){
      var hirelists = $scope.hire;

      var r = confirm("Are you sure want to delete hire "+projectTitle+" ?");
      var txt;
      if (r == true) {
          hirelists.splice(index,1);
          var  url=environment.url;
          url=url+'hireds/'+id;
          return $http.delete(url)
            .then(function success(response) {
              return response;
            }).catch(function error(error) {
              return error;
            });
      }

    }
    this.$state = $state;
  }
  getHireLists($scope,$http){
    var  url=environment.url;
    url=url+'hireds';
    return $http.get(url)
      .then(function success(response) {
        $scope.hire = response.data;
        $scope.totalItems = response.data.length;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
      }).catch(function error(error) {
        return error;
      });
  }
  getLocations() {
    this.selectedLocations = null;
    this.masterService.getLocations().then(result => {
      this.locations = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting locations from server', error);
      });
  }

  getProducts() {
    this.selectedProducts = null;
    this.masterService.getProducts().then(result => {
      this.products = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting products from server', error);
      });
  }

  isAdmin() {
    this.Auth.getCurrentUser().then(result => {
      if(result.role !=='admin'){
        this.$state.go('adminLogin');
      }
    }).catch(error => {
      console.error("Error occurred while getting UserInfo from server", error);
    });
  }
  stateName() {
   if (this.$state.current.name == 'adminHire') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.hire', [uiRouter])
  .config(routes)
  .component('hire', {
    template: require('./hire.html'),
    controller: HireComponent,
    controllerAs: 'hireCtrl'
  })
  .name;

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './review.routes';
import CreatereviewController from '../createmodal/createreview/createreview.controller';
import {environment} from '../../../environments/environment';
import {masterService} from '../../services/master/master.service';



export class ReviewComponent {
  searchReviewList = {
    "name":"",
    "product":"",
    "location":"",
    "company": "",
    "reviewType": "",
    "postedBy": "",
  };
  companies = [];
  products = [];
//  '@ngInject';
  constructor(Auth,$state, $uibModal,$scope,$http) {
    this.message = 'Hello';
    this.Auth = Auth;
    this.isAdmin();
    this.masterService = new masterService($http);
    this.getReviewLists($scope, $http);
    $scope.viewby;
    $scope.maxSize;
    $scope.currentPage;
    this.getReviewLists($scope,$http);
    this.getCompanies();
    this.getProducts();
    $scope.noSearchResult = false;

    $scope.pageChanged = function(){
      var page  = $scope.currentPage -1;
      var limit = $scope.itemsPerPage;
      var  url=environment.url;
      url=url+'reviews?page='+page+'&limit='+limit;
      return $http.get(url)
        .then(function success(response) {
        $scope.review =  response.data;
        }).catch(function error(error) {
          return error;
        });
    }

    this.searchReview = function() {
      $scope.noSearchResult = false;

      let obj = this.searchReviewList;
      Object.keys(obj).forEach(key => {
      	if (obj[key] === "" || obj[key] === null){
          delete obj[key];
          }
      });
      let searchObj = obj;
      var url = environment.url;
      var len;
      url = url + 'reviews/search';
      return $http.post(url, searchObj)
        .then(function success(response) {
          // console.log(response.data);
          len = Object.keys(response.data).length;
          $scope.review = response.data;
          $scope.totalItems = response.data.length;
          $scope.itemsPerPage = 10;
          $scope.currentPage = 1;
          $scope.maxSize = 5;
          // return response;
          if(len == 0){
            $scope.noSearchResult = true;
          }
        }).catch(function error(error) {
          return error;
        });
}

    this.createReview = function(){
      var modalInstance =  $uibModal.open({
        template: require('../createmodal/createreview/createReview.html'),
        controller: CreatereviewController,
        controllerAs: 'createReviewCtrl',
      });
    modalInstance.result.then(function(submitVar) {
      if(typeof submitVar !== 'undefined'){
      $scope.review.push(submitVar);
    }

  });
    };
    this.deleteReview = function(id,name,index){
      var reviewlists = $scope.review;

      var r = confirm("Are you sure want to delete review "+name+" ?");
      var txt;
      if (r == true) {
          reviewlists.splice(index,1);
          var  url=environment.url;
          url=url+'reviews/'+id;
          return $http.delete(url)
            .then(function success(response) {
              return response;
            }).catch(function error(error) {
              return error;
            });
      }
    }
    this.onReviewFlag = function(id,name,index){
      var obj = {id:id,flag:1};
     var r = confirm("Are you sure want to on review "+name+" ?");
      var txt;
      if (r == true) {
          var  url=environment.url;
          url=url+'reviews/onoff';
          return $http.post(url,obj)
            .then(function success(response) {
              if(response.status == '204'){
                var  url=environment.url;
                url=url+'reviews';
                return $http.get(url)
                  .then(function success(response) {
                    $scope.review = response.data;
                  }).catch(function error(error) {
                    return error;
                  });
              }
            //  return response;
            }).catch(function error(error) {
              return error;
            });
      }
    }

    this.offReviewFlag = function(id,name,index){
      var obj = {id:id,flag:0};
     var r = confirm("Are you sure want to off review "+name+" ?");
      var txt;
      if (r == true) {
          var  url=environment.url;
          url=url+'reviews/onoff';
          return $http.post(url,obj)
            .then(function success(response) {
              if(response.status == '204'){
                var  url=environment.url;
                url=url+'reviews';
                return $http.get(url)
                  .then(function success(response) {
                    $scope.review = response.data;
                  }).catch(function error(error) {
                    return error;
                  });
              }
            //  return response;
            }).catch(function error(error) {
              return error;
            });
      }
    }
    this.$state = $state;
    this.initFlag = function(flag){
      if(flag == 1){
      return   true;
      }else {
      return   false;
      }
    }
    this.changeFlagStatus = function(flag){
      if(flag == 1){
      return  this.flagStatus = false;
      }else {
      return  this.flagStatus = true;
      }
    }
  }
  getReviewLists($scope,$http){
    var  url=environment.url;
    url=url+'reviews';
    return $http.get(url)
      .then(function success(response) {
        $scope.review = response.data;
        $scope.totalItems = response.data.length;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
      }).catch(function error(error) {
        return error;
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

  getCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
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

  stateName() {
   if (this.$state.current.name == 'adminReview') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.review', [uiRouter])
  .config(routes)
  .component('review', {
    template: require('./review.html'),
    controller: ReviewComponent,
    controllerAs: 'reviewCtrl'
  })
  .name;

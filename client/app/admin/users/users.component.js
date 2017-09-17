'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './users.routes';
import CreateuserController from '../createmodal/createuser/createuser.controller';
import {environment} from '../../../environments/environment';
import {masterService} from '../../services/master/master.service';


export class UsersComponent {
  searchUserList = {
    name: "",
    email: ""
  }
//  '@ngInject';
  constructor(Auth,$state, $uibModal,$scope,$http) {
    this.message = 'Hello';
    this.Auth = Auth;
    this.isAdmin();
    this.masterService = new masterService($http);
    this.getUserLists($scope, $http);

    $scope.viewby;
    $scope.maxSize;
    $scope.currentPage;

    $scope.pageChanged = function(){
      var page  = $scope.currentPage -1;
      var limit = $scope.itemsPerPage;
      var  url=environment.url;
      url=url+'users?page='+page+'&limit='+limit;
      var obj;
      return $http.get(url)
        .then(function success(response) {
          obj = response.data;
        $scope.users =  obj.filter(function(users){return (users.role == "user");});
        //  console.log(obj);
        }).catch(function error(error) {
          return error;
        });
    }
    this.getUserLists($scope,$http);
    $scope.noSearchResult = false;

    this.searchUser = function() {
      $scope.noSearchResult = false;
      let obj = this.searchUserList;
      Object.keys(obj).forEach(key => {
        if(obj[key] === '' || obj[key] === null){
          delete obj[key];
        }
      });
      let searchObj = obj;
      var url = environment.url;
      url = url + 'users/search';
      let len;
      return $http.post(url, searchObj)
        .then(function success(response) {
          // console.log(response.data);
        //  $scope.users = response.data;
          $scope.itemsPerPage = 10;
          $scope.currentPage = 1;
          $scope.maxSize = 5;
          obj = response.data;
        $scope.users =  obj.filter(function(users){return (users.role == "user");});
        $scope.totalItems = $scope.users.length;
        len = $scope.users.length;
          if(len == 0){
            $scope.noSearchResult = true;
          }
          // return response;
        }).catch(function error(error) {
          return error;
        });
    }
    this.createUser = function(){
      var modalInstance =  $uibModal.open({
        template: require('../createmodal/createuser/createUser.html'),
        controller: CreateuserController,
        controllerAs: 'createUserCtrl',
      });
      modalInstance.result.then(function(submitVar) {
        if(typeof submitVar !== 'undefined'){
          $scope.users.push(submitVar);
        }
      });
    };
    this.deleteUser = function(id,name,index){
      var userlists = $scope.users;

      var r = confirm("Are you sure want to delete user "+name+" ?");
      var txt;
      if (r == true) {
          userlists.splice(index,1);
          var  url=environment.url;
          url=url+'users/'+id;
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
  getUserLists($scope,$http){
    var  url=environment.url;
    url=url+'users';
    var obj;
    return $http.get(url)
      .then(function success(response) {
      //  $scope.users = response.data;
        $scope.itemsPerPage = 10;
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        obj = response.data;
      $scope.users =  obj.filter(function(users){return (users.role == "user");});
      $scope.totalItems = $scope.users.length;
      //  console.log(obj);
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

  stateName() {
   if (this.$state.current.name == 'adminUsers') {
      return true;
    } else {
      return false;
    }
  }
}

export default angular.module('salesdoorApp.users', [uiRouter])
  .config(routes)
  .component('users', {
    template: require('./users.html'),
    controller: UsersComponent,
    controllerAs: 'usersCtrl'
  })
  .name;

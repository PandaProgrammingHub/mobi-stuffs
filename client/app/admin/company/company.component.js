'use strict';
const angular = require('angular');
const uiBootstrap = require('angular-ui-bootstrap');

import CreateCompanyController from '../createmodal/createCompany/create_company.controller';
import EditAdminAssignCompanyController from '../createmodal/editAdminAssignCompany/edit_admin_assign_company.controller';
import EditAdminCompanyController from '../createmodal/editAdminCompany/edit_admin_company.controller';
import {masterService} from '../../../app/services/master/master.service';
import {environment} from '../../../environments/environment';

import routes from './company.routes';

export class companyComponent {

  searchData =[];
  company = [];


  /*@ngInject*/
  constructor(Auth, $scope, $uibModal, $state, $http) {
    $scope.companies = [];
    this.Auth = Auth;
    this.isAdmin();
    'ngInject';
    $scope.showNotifcation = 'true';

    this.masterService = new masterService($http);
  //Create Company Function
    this.createAdminCompany = function() {
      var that = this;
      var modalInstance = $uibModal.open({
        template: require('../createmodal/createCompany/create_company.html'),
        controller: CreateCompanyController,
        controllerAs: 'createCompanyCtrl',
      });
      modalInstance.result.then(function(company) {
        console.log('copmap',company);
        if(typeof company !== 'undefined'){
          that.addCompany(company);
          that.getcompanyList();
        }
      });
    };
  //Edit Admin Assign Company
    this.editAdminAssignCompany = function(companyValue) {
      var that = this;
      $scope.company = companyValue;
      var modalInstance = $uibModal.open({
        template: require('../createmodal/editAdminAssignCompany/edit_admin_assign_company.html'),
        controller: EditAdminAssignCompanyController,
        controllerAs: 'editAdminAssignCompany',
        resolve: {
          company: function() {
            return $scope.company;
          }
        }
      });
      modalInstance.result.then(function(id) {
        var companyId = id;
        that.updateAdminCompanies(companyId);
      });
    };

    this.pageChanged = function(){
      var page  = this.currentPage - 1;
      var limit = this.itemsPerPage;

      this.masterService.getcompanylist(page,limit).then(result => {
          this.companies = result.data;
      })
        .catch(error => {
          console.error('Error occurred while getting companies from server', error);
        });
    };

    this.editAdminCompany = function(companyValue) {
      var that = this;
      $scope.company = companyValue;
      var modalInstance = $uibModal.open({
        template: require('../createmodal/editAdminCompany/edit_admin_company.html'),
        controller: EditAdminCompanyController,
        controllerAs: 'editAdminCompany',
        resolve: {
          company: function() {
            return $scope.company;
          }
        }
      });
      modalInstance.result.then(function(company) {
        that.updateCompanies(company);
      });
    };


    this.deleteCompanies = function(i) {
      var companieslists = this.companies;
      var companyName = companieslists[i].name;
      var companyId = companieslists[i]._id;
      var r = confirm("Are you sure want to delete user "+companyName+" ?");
      if(r == true) {
        companieslists.splice(i,1);
        this.masterService.deleteCompanyResult(companyId).then(result => {
        })
          .catch(error => {
            console.error('Error occurred while getting companies from server', error);
          });
      }
    };

    //createCompanyRecord

    this.addCompany = function(createCompanyValue) {
      console.log('company value', createCompanyValue);
      var url = environment.url;
      url = url + '/companies/';
      return $http.post(url, createCompanyValue)
        .then(function success(response) {
          $scope.companies.push(createCompanyValue);
          return response;
        })
        .catch(function error(error) {
          return error;
        });
    };
    this.$state = $state;
    this.getcompanyList();
  }
  updateAdminCompanies(company){
    console.log('update admin', company);
    this.masterService.updateCompanyRecord(company).then(result => {
    }).catch(error => {
      console.error('Error occurred while getting companies from server', error);
    });
  }

  getcompanyList() {
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
      this.totalItems = result.data.length;
      this.itemsPerPage = 10;
      this.currentPage = 1;
      this.maxSize = 5;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
  }
  updateCompanies(company){
    this.masterService.updateCompanyRecord(company).then(result => {
    }).catch(error => {
      console.error('Error occurred while getting companies from server', error);
    });
  }

  getResultedData(searchTextvalue, Typevalue) {
    Typevalue = 'Company';
    if(searchTextvalue != null && Typevalue != null) {
      this.masterService.getSearchResults(searchTextvalue, Typevalue).then(result => {
        this.companies = result.data;
        this.companyItemlist = result.data.length;

        if(this.companyItemlist == 0){
          this.showNotifcation = 'false';
        }else{
          this.showNotifcation = 'true';
        }
      }).catch(error => {
        console.error('Error occurred while getting companies from server', error);
      });
    }
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
    if(this.$state.current.name == 'adminCompany') {
      return true;
    } else {
      return false;
    }
  }
}


export default angular.module('salesdoorApp.Company', [uiBootstrap])
  .config(routes)
  .component('company', {
    template: require('./company.html'),
    controller: companyComponent,
    controllerAs: '$ctrl'
  })
  .name;

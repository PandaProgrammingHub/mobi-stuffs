'use strict';
import {masterService} from '../../../services/master/master.service';
import {environment} from '../../../../environments/environment';


export default class CreateuserController {
  createUserList = {
    name: "",
    email: "",
    currentcompany: "",
    company: "",
    products: "",
    location: "",
    description : "",
    password:"salesdoor123"
  };
  companies = [];
  locations = [];
  products = [];

  /*@ngInject*/
  constructor(Auth, $state, $http,$uibModalInstance, $uibModal) {
    this.$uibModalInstance = $uibModalInstance;
    this.$state = $state;
    this.errorMessage = '';
    this.masterService = new masterService($http);
    this.getCompanies();
    this.getLocations();
    this.getProducts();
    this.close = function(data) {
      $uibModalInstance.close(data);
    };
    this.addUser = function(userData){
      var url = environment.url;
      url = url + 'users';
      return $http.post(url, userData)
      .then(() => {
        this.close(this.createUserList);
      })
      .catch(err => {
        err = err.data;
        this.errorMessage = err.message;
      });
    }
    this.createuser = function(form){
      if(form.$valid) {
        this.addUser(this.createUserList);
      }
      else {
        console.log("not valid user creted");
      }
    }
  };
  getCompanies() {
    this.selectedCompany = null;
    this.masterService.getCompanies().then(result => {
      this.companies = result.data;
    })
      .catch(error => {
        console.error('Error occurred while getting companies from server', error);
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
}

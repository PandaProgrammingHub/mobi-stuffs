'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import {masterService} from '../../services/master/master.service';
import routes from './preSalesReview.routes';
import _ from 'lodash';



class PreSales {
  constructor() {
    this.companyName = '';
    this.companyId='';
    this.name = '';
    this.experience = '';
    this.product = [];
    this.location = '';
    this.describe = '';
    this.rateDifficulty = '';
    this.decisionTime = 'Decision Time';
    this.departmentsInvolved = [];
    this.keyDecisionMakers = [];
    this.successFactors = [];
    this.whatWasGood = '';
    this.whatCouldBeBetter = '';
    this.isAnonymous='';

    this.expectationManagement = '';
    this.changeManagement = '';
    this.reviewType = '';
    this.user = '';
  }
}

export class PreSalesReviewComponent {

  /*@ngInject*/
  constructor($http, $state,$scope,Auth,mFactory, $window) {
    this.$window = $window;
    this.$http = $http;
    this.$state = $state;
    this.Auth = Auth;
    this.compSelected = undefined;
    this.masterService = new masterService($http);
    this.$http = $http;
    this.prods = [];
    this.locs = [];
    this.comps = [];
    this.newPreSales = new PreSales();
    this.rated = false;
    this.mFactory=mFactory;
    this.departmentsInvolved=[
      "Human Resource",
      "Finance",
      "Information Technology",
      "Marketing",
      "Operations"
    ];
    this.successFactors=[
      "Follow Ups",
      "Pre Sales Elevator Pitch",
      "Negotiation Skills",
      "Product Knowledge",
    ];

    this.products = function() {
      this.masterService.getProducts()
        .then(res => res.data.map(item => this.prods.push(item.name)));
    };
    this.products();
    this.locations = function () {
      this.masterService.getLocations()
        .then(res => res.data.map(item => this.locs.push(item.name)));
    };
    this.locations();
    this.companies = function () {
      this.compSelected = mFactory.getReviewType().selectedCompany;
      if (this.compSelected !== undefined) {
        this.newPreSales.companyName = this.compSelected.name;
        this.newPreSales.companyId = this.compSelected._id;
        this.newPreSales.isAnonymous = mFactory.getReviewType().isAnonymous;
      } else {
        this.$state.go('writereviewsignup');
      }

      this.masterService.getCompanies()
        .then(res => res.data.map(item => this.comps.push(item.name)));
    };
    this.companies();
  }
  loadTags(query) {
    this.prods[0] = query;
    return _.uniq(this.prods);
  }
  loadDeptsTags(query){
    return _.uniq(this.departmentsInvolved);
  }
  loadSuccessFacTags(query){
    this.successFactors[0] = query;
    return _.uniq(this.successFactors);
  }
  isValid(bool) {
    return bool && this.rated;
  }

  setOExpRate(rating) {
    this.newPreSales.experience = +rating;
    this.isRated();
  }

  setODiffRate(rating) {
    this.newPreSales.rateDifficulty = +rating;
    this.isRated();
  }

  isRated() {
    this.rated = this.newPreSales.experience > 0 && this.newPreSales.rateDifficulty > 0;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handlePreSalesSubmit() {
    var self=this;
    var currentUser =this.Auth.getCurrentUser();
    currentUser.then(userdata=>{
      self.newPreSales.reviewType = 'preSales';
      self.newPreSales.user =userdata._id;
      self.newPreSales.reviewDate = new Date();
      if(self.newPreSales.decisionTime==='Decision Time')
        self.newPreSales.decisionTime='';
      self.addPreSalesReview(this.newPreSales);
    }).catch(error=>{
      console.log(error);
    })
  }

  addPreSalesReview(preSales) {
    var self=this;
    if(preSales.decisionTime === 'Decision Time') {
      preSales.decisionTime = '';
    }
    var keyDecisionMakers= preSales.keyDecisionMakers;
    preSales.keyDecisionMakers=[];
    for (var key in keyDecisionMakers){
      preSales.keyDecisionMakers.push(keyDecisionMakers[key].text);
    }
    var product= preSales.product;
    preSales.product=[];
    for (var key in product){
      preSales.product.push(product[key].text);
    }
    var depts= preSales.departmentsInvolved;
    preSales.departmentsInvolved=[];
    for (var key in depts){
      preSales.departmentsInvolved.push(depts[key].text);
    }
    var succ= preSales.successFactors;
    preSales.successFactors=[];
    for (var key in succ){
      preSales.successFactors.push(succ[key].text);
    }
    this.$http.post('/api/reviews', preSales).then(response=>{
      self.submitted = true;
      self.mFactory.setPreSale(true);
      self.$state.go('createReviewTwo');
    }).catch(error=>{
      console.log("error occurred" ,error);
    });
  }

  deletePreSales(preSales) {
    this.$http.delete(`/api/review/${preSales._id}`);
  }
}

export default angular.module('salesdoorApp.pre-salesReview', [uiRouter])
  .config(routes)
  .component('preSalesReview', {
    template: require('./preSalesReview.html'),
    controller: PreSalesReviewComponent,
    controllerAs: 'preSalesReviewCtrl'
  })
  .name;

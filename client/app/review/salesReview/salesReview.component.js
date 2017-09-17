'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import {masterService} from '../../services/master/master.service';
import routes from './salesReview.routes';
import _ from 'lodash';

class Sales {
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
    this.successFactors = '';
    this.whatWasGood = '';
    this.whatCouldBeBetter = '';
    this.isAnonymous='';
    this.rateNegotiationDifficulty = '';

    this.expectationManagement = '';
    this.changeManagement = '';
    this.reviewType = '';
    this.user = '';


  }
}

export class SalesReviewComponent {

  /*@ngInject*/
  constructor($http, $state,$scope, Auth,mFactory, $window) {
    this.$window = $window;
    this.$http = $http;
    this.$state = $state;
    this.Auth = Auth;
    this.masterService = new masterService($http);
    this.$http = $http;
    this.prods = [];
    this.locs = [];
    this.comps = [];
    this.mFactory=mFactory;
    this.newSales = new Sales();
    this.rated = false;
    this.departmentsInvolved=[
      "Human Resource",
      "Finance",
      "Information Technology",
      "Marketing",
      "Operations"
    ];
    this.successFactors=[
      "Communication Skills",
      "Presentation Skills",
      "Access to Senior Management",
      "Stakeholder Management",
      "Negotiation Skills",
      "Product Knowledge",
      "Deep Discounting"
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
        this.newSales.companyName = this.compSelected.name;
        this.newSales.companyId = this.compSelected._id;
        this.newSales.isAnonymous = mFactory.getReviewType().isAnonymous;
      } else {
        this.$state.go('writeReview');
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
    this.newSales.experience = +rating;
    this.isRated();
  }

  setODiffRate(rating) {
    this.newSales.rateDifficulty = +rating;
    this.isRated();
  }

  setNRate(rating) {
    this.newSales.rateNegotiationDifficulty = +rating;
    this.isRated();
  }

  isRated() {
    this.rated = this.newSales.experience > 0 && this.newSales.rateDifficulty > 0 && this.newSales.rateNegotiationDifficulty > 0;
  }

  handleSalesSubmit() {
    var self=this;
    var currentUser =this.Auth.getCurrentUser();
    currentUser.then(userdata=>{
      self.newSales.reviewType = 'sales';
      self.newSales.user =userdata._id;
      self.newSales.reviewDate = new Date();
      if(self.newSales.decisionTime==='Decision Time')
        self.newSales.decisionTime="";
      self.addSalesReview(this.newSales);
    }).catch(error=>{
      console.log(error);
    })
  }

  addSalesReview(sales) {
    var self=this;
    if(sales.decisionTime === 'Decision Time') {
      sales.decisionTime = '';
    }
    var keyDecisionMakers= sales.keyDecisionMakers;
    sales.keyDecisionMakers=[];

    for (var key in keyDecisionMakers){
      sales.keyDecisionMakers.push(keyDecisionMakers[key].text);
    }
    var product= sales.product;
    sales.product=[];
    for (var key in product){
      sales.product.push(product[key].text);
    }
    var depts= sales.departmentsInvolved;
    sales.departmentsInvolved=[];
    for (var key in depts){
      sales.departmentsInvolved.push(depts[key].text);
    }
    var succ= sales.successFactors;
    sales.successFactors=[];
    for (var key in succ){
      sales.successFactors.push(succ[key].text);
    }
    this.$http.post('/api/reviews', sales).then(response=>{
      self.submitted = true;
      self.mFactory.setSale(true);
      self.$state.go('createReviewTwo');
    }).catch(error=>{
      console.log("error occurred" ,error);
    });
  }

  deleteSales(sales) {
    this.$http.delete(`/api/review/${sales._id}`);
  }
}

export default angular.module('salesdoorApp.salesReview', [uiRouter])
  .config(routes)
  .component('salesReview', {
    template: require('./salesReview.html'),
    controller: SalesReviewComponent,
    controllerAs: 'salesReviewCtrl'
  })
  .name;

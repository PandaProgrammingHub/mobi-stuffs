'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import {masterService} from '../../services/master/master.service';
import routes from './postSalesReviewSignup.routes';
import _ from 'lodash';

class PostSales {
  constructor() {
    this.companyName = '';
    this.companyId='';
    this.name = '';
    this.experience = '';
    this.product = [];
    this.location = '';
    this.describe = '';
    this.rateDifficulty = '';
    this.paymentTerms = '';
    this.expectationManagement = 'Expectation Management';
    this.changeManagement = 'Change Management';
    this.keyDecisionMakers = [];
    this.successFactors = [];


    this.whatWasGood = '';
    this.whatCouldBeBetter = '';
    this.isAnonymous='';

    this.reviewType = '';
    this.user = '';
  }
}

export class PostSalesReviewSignupComponent {

  /*@ngInject*/
  constructor($http,   $state, Auth,mFactory, $window) {
    this.$window = $window;
    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    this.masterService = new masterService($http);
    this.message = 'Hello';
    this.$state = $state;
    this.prods = [];
    this.locs = [];
    this.comps = [];
    this.mFactory=mFactory;
    this.newPostSales = new PostSales();
    this.rated = false;
    this.successFactors=[
      "Communication Skills",
      "Stakeholder Management",
      "On time delivery",
      "On cost delivery",
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
      this.compSelected=mFactory.getReviewType().selectedCompany;
      if (this.compSelected !== undefined) {
        this.newPostSales.companyName = this.compSelected.name;
        this.newPostSales.companyId = this.compSelected._id;
        this.newPostSales.isAnonymous = mFactory.getReviewType().isAnonymous;

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
  loadSuccessFacTags(query){
    this.successFactors[0] = query;
    return _.uniq(this.successFactors);
  }

  isValid(bool) {
    return bool && this.rated;
  }

  setOExpRate(rating) {
    this.newPostSales.experience = +rating;
    this.isRated();
  }

  setODiffRate(rating) {
    this.newPostSales.rateDifficulty = +rating;
    this.isRated();
  }

  setPayTerms(rating) {
    this.newPostSales.paymentTerms = +rating;
    this.isRated();
  }

  isRated() {
    this.rated = this.newPostSales.experience > 0 && this.newPostSales.rateDifficulty > 0 && this.newPostSales.paymentTerms > 0;
  }

  handlePostSalesSubmit() {
    var self=this;
    var currentUser =this.Auth.getCurrentUser();
    currentUser.then(userdata=>{
      self.newPostSales.reviewType = 'postSales';
      self.newPostSales.user =userdata._id;
      self.newPostSales.reviewDate = new Date();
      if(self.newPostSales.expectationManagement==='Expectation Management')
        self.newPostSales.expectationManagement='';
      if(self.newPostSales.changeManagement==='Change Management')
        self.newPostSales.changeManagement='';
      if(self.newPostSales.decisionTime === 'Decision Time') {
        self. newPostSales.decisionTime = '';
      }
      self.addPostSalesReview(this.newPostSales);
    }).catch(error=>{
      console.log(error);
    })
  }

  addPostSalesReview(postSales) {
    var self=this;
    if(postSales.decisionTime === 'Decision Time') {
      postSales.decisionTime = '';
    }
    var keyDecisionMakers= postSales.keyDecisionMakers;
    postSales.keyDecisionMakers=[];
    for (var key in keyDecisionMakers){
      postSales.keyDecisionMakers.push(keyDecisionMakers[key].text);
    }
    var product= postSales.product;
    postSales.product=[];
    for (var key in product){
      postSales.product.push(product[key].text);
    }
    var succ= postSales.successFactors;
    postSales.successFactors=[];
    for (var key in succ){
      postSales.successFactors.push(succ[key].text);
    }
    this.$http.post('/api/reviews', postSales).then(response=>{
      self.submitted = true;
      self.$state.go('followCompanies');
    }).catch(error=>{
      console.log("error occurred" ,error);
    });
  }

  deletePostSales(postSales) {
    this.$http.delete(`/api/review/${postSales._id}`);
  }
}

export default angular.module('salesdoorApp.postSalesReviewSignup', [uiRouter])
  .config(routes)
  .component('postSalesReviewSignup', {
    template: require('./postSalesReviewSignup.html'),
    controller: PostSalesReviewSignupComponent,
    controllerAs: 'postSalesReviewSignupCtrl'
  })
  .name;

'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');
import {masterService} from '../../services/master/master.service';
import routes from './overallReview.routes';
import _ from 'lodash';
class Overall {
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

export class OverallReviewComponent{
  /*@ngInject*/
  constructor($http,$state,$scope,Auth,mFactory,$window) {
    this.$window = $window;
    this.$http = $http;
    this.$state = $state;
    // this.selected = undefined;
    this.compSelected = undefined;
    this.masterService = new masterService($http);
    //this.tagsKeyMakers=[];
    this.Auth = Auth;
    this.newOverall = new Overall();
    this.rated = false;
    this.prods = [];
    this.locs = [];
    this.comps = [];
    this.$scope=$scope;
    this.mFactory=mFactory;
    this.departmentsInvolved=[
      "Human Resource",
      "Finance",
      "Information Technology",
      "Marketing",
      "Operations"
    ];
    this.successFactors=[
      "Communication Skills",
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
        this.newOverall.companyName = this.compSelected.name;
        this.newOverall.companyId = this.compSelected._id;
        this.newOverall.isAnonymous = mFactory.getReviewType().isAnonymous;
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
    this.newOverall.experience = +rating;
    this.isRated();
  }

  setODiffRate(rating) {
    this.newOverall.rateDifficulty = +rating;
    this.isRated();
  }

  isRated() {
    this.rated = this.newOverall.experience > 0 && this.newOverall.rateDifficulty > 0;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOverallSubmit(overallForm) {
    // if(overallForm.isValid)
    {
      var self = this;
      var currentUser = this.Auth.getCurrentUser();
      currentUser.then(userdata => {
        self.newOverall.reviewDate = new Date();
        self.newOverall.reviewType = 'overall';
        if(self.newOverall.decisionTime==='Decision Time')
          self.newOverall.decisionTime="";
        self.newOverall.user = userdata._id;
        self.addOverallReview(this.newOverall);
      }).catch(error => {
        console.log(error);
      })
    }
  }
  addOverallReview(overall) {
    var self=this;
    if(overall.decisionTime === 'Decision Time') {
      overall.decisionTime = '';
    }

    var keyDecisionMakers= overall.keyDecisionMakers;
    overall.keyDecisionMakers=[];
    for (var key in keyDecisionMakers){
      overall.keyDecisionMakers.push(keyDecisionMakers[key].text);
    }
    var product= overall.product;
    overall.product=[];
    for (var key in product){
      overall.product.push(product[key].text);
    }
    var depts= overall.departmentsInvolved;
    overall.departmentsInvolved=[];
    for (var key in depts){
      overall.departmentsInvolved.push(depts[key].text);
    }
    var succ= overall.successFactors;
    overall.successFactors=[];
    for (var key in succ){
      overall.successFactors.push(succ[key].text);
    }
    this.$http.post('/api/reviews', overall).then(response=>{
      self.submitted = true;
      self.mFactory.setOverall(true);
      self.$state.go('createReviewTwo');
      this.submitted = true;
    }).catch(error=>{
      console.log("error occurred" ,error);
    });
  }
  deleteOverall(overall) {
    this.$http.delete(`/api/review/${overall._id}`);
  }}

export default angular.module('salesdoorApp.overallReview', [uiRouter])
  .config(routes)
  .component('overallReview', {
    template: require('./overallReview.html'),
    controller: OverallReviewComponent,
    controllerAs: 'overallReviewCtrl'
  })
  .name;

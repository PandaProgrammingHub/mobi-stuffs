'use strict';
const angular = require('angular');

/*@ngInject*/
export function mFactoryService() {

  var factory = {};
  var selectedCompany = {};
  var ProjectTitle;
  var UserIdToRecommend;
  var overall;
  var postsales;
  var presales;
  var sales;
  factory.getReviewType = function () {
    return selectedCompany;
  }
  factory.setReviewType = function (selComp) {
    selectedCompany = selComp;
  }

  factory.getCompanyId = function () {
    return selectedCompany;
  }
  factory.setCompanyId = function (selComp) {
    selectedCompany = selComp;
  }

  factory.getCompanyReviews = function () {
    return selectedCompany;
  }
  factory.setCompanyReviews = function (reviews) {
    selectedCompany = reviews;
  }

  factory.getCompanyInfo = function () {
    return selectedCompany;
  }
  factory.setCompanyInfo = function (companyInfo) {
    selectedCompany = companyInfo;
  }

  factory.getOverall = function () {
    return overall;
  }
  factory.setOverall = function (selComp) {
    overall = selComp;
  }
  factory.getPreSale = function () {
    return presales;
  }
  factory.setPreSale = function (selComp) {
    presales = selComp;
  }
  factory.getPostSale = function () {
    return postsales;
  }
  factory.setPostSale = function (selComp) {
    postsales = selComp;
  }
  factory.getSale = function () {
    return sales;
  }
  factory.setSale = function (selComp) {
    sales = selComp;
  }
  factory.getProjectTitle = function() {
    return ProjectTitle;
  }
  factory.setProjectTitle = function(projectTitle) {
    ProjectTitle = projectTitle;
  }
  factory.getUserIdToRecommend = function() {
    return UserIdToRecommend;
  }
  factory.setUserIdToRecommend = function(userId) {
    UserIdToRecommend = userId;
  }
  return factory;


}

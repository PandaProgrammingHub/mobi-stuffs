'use strict';

import angular from 'angular';
import ProfileController from './profile.controller';
import AboutController from './about/about.controller';
import OverallController from './overall/overall.controller';
import PostSalesController from './postSales/postSales.controller';
import PreSalesController from './preSales/preSales.controller';
import RfpsController from './rfps/rfps.controller';
import SalesController from './sales/sales.controller';
import ResponseController from './response/response.controller';
import routes from './profile.route';

export default angular.module('salesdoorApp.companyProfile', [])
  .config(routes)
  .component('companyProfile', {
    template: require('./profile.html'),
    controller: ProfileController,
    controllerAs: 'profileCtrl'
  })
  .component('companyAbout', {
    template: require('./about/about.html'),
    controller: AboutController,
    controllerAs: 'companyAboutCtrl'
  })
  .component('companyOverall', {
    template: require('./overall/overall.html'),
    controller: OverallController,
    controllerAs: '$ctrl'
  })
  .component('companyPostsales', {
    template: require('./postSales/postSales.html'),
    controller: PostSalesController,
    controllerAs: '$ctrl'
  })
  .component('companyPresales', {
    template: require('./preSales/preSales.html'),
    controller: PreSalesController,
    controllerAs: '$ctrl'
  })
  .component('companyRfps', {
    template: require('./rfps/rfps.html'),
    controller: RfpsController,
    controllerAs: '$ctrl'
  })
  .component('companySales', {
    template: require('./sales/sales.html'),
    controller: SalesController,
    controllerAs: '$ctrl'
  })
  .component('companyResponse', {
    template: require('./response/response.html'),
    controller: ResponseController,
    controllerAs: '$ctrl'
  })
  .name;

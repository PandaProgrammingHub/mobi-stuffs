'use strict';
export default function ($stateProvider) {
  'ngInject';
  $stateProvider
    .state('companyProfile', {
      url: '/profile',
      template: '<company-profile></company-profile>',
    })
    .state('companyProfile.about', {
      url: '/about',
      template: '<company-about></company-about>',
    })
    .state('companyProfile.overall', {
      url: '/overall',
      template: '<company-overall></company-overall>',
    })
    .state('companyProfile.postSales', {
      url: '/postSales',
      template: '<company-postsales></company-postsales>',
    })
    .state('companyProfile.preSales', {
      url: '/preSales',
      template: '<company-presales></company-presales>',
    })
    .state('companyProfile.rfps', {
      url: '/rfps',
      template: '<company-rfps></company-rfps>',
    })
    .state('companyProfile.sales', {
      url: '/sales',
      template: '<company-sales></company-sales>',
    });
}

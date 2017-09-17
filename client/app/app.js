'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap/src/pagination';

import 'angular-validation-match';
import {
  routeConfig
} from './app.config';
import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/index';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import writeReview from './review/createReview/createReview.component';
import overallReview from './review/overallReview/overallReview.component';
import preSalesReview from './review/preSalesReview/preSalesReview.component';
import salesReview from './review/salesReview/salesReview.component';
import postSalesReview from './review/postSalesReview/postSalesReview.component';
import userProfile from './user/profile/profile.component';
import userReview from './user/reviews/reviews.component';
import userRecommendation from './user/recommendation/recommendation.component';
import hired from './user/hired/index';
import userGroups from './user/group/group.component';
import userCompanies from './user/companies/companies.component';
import userRfp from './user/rfp/index';
import groupJoin from './joinGroups/joinGroups.component';
import followCompanies from './followCompanies/followCompanies.component';
import useradditionalinfoone from './user/additionalinfoone/additionalinfoone.component';
import useradditionalinfotwo from './user/additionalinfotwo/additionalinfotwo.component';
import resetpassword from './user/resetpassword/resetpassword.component';
import companyLogin from './company/login/index';
import LeftNavComponent from './leftNav/leftNav.component';
import './app.scss';
import companySignup from './company/companySignup/companySignup.component';
import companySignupSuccess from './company/companySignupSuccess/companySignupSuccess.component';
import rfp from './company/rfp/index';
import Reviews from './company/review/review.component';
import hireMe from './company/hire/hire.component';
import SearchBarComponent from './searchBar/searchBar.component';
import writereviewsignup from './user/writereviewsignup/writereviewsignup.component';
import overallReviewSignup from './review/overallReviewSignup/overallReviewSignup.component';
import postSalesReviewSignup from './review/postSalesReviewSignup/postSalesReviewSignup.component';
import preSalesReviewSignup from './review/preSalesReviewSignup/preSalesReviewSignup.component';
import salesReviewSignup from './review/salesReviewSignup/salesReviewSignup.component';
import postPopup from './user/hired/postPopup/index';
import masterService from './services/master/master.service';
import forgotPassword from './account/forgot_password/index';
import createReviewTwo from './review/createReviewTwo/createReviewTwo.component';
import 'ng-tags-input';
import searchHired from './searchHired/searchHired.component';
import searchRfp from './searchRfp/searchRfp.component';
import companyProfile from './company/profile/index';
import NotificationPanelComponent from './notificationPanel/notificationPanel.component';
import adminDashboard from './admin/dashboard/dashboard.component';
import adminUsers from './admin/users/users.component';
import adminReview from './admin/review/review.component';
import adminHire from './admin/hire/hire.component';
import userpublic from './userpublic/userpublic.component';
import mfactory from '../app/services/mFactory/factory.module';
//admin imports
import Company from './admin/company/company.component';
import rfpAdmin from './admin/rfpAdmin/rfpAdmin.component';
import uploadMasterAdmin from './admin/uploadMasterAdmin/uploadMasterAdmin.component';

import adminResetpassword from './admin/resetpassword/resetpassword.component';
import adminLogin from './admin/login/login.component';

angular.module('salesdoorApp', [ngCookies, ngResource, ngSanitize, uiRouter,
  uiBootstrap, _Auth, account, admin, 'validation.match', navbar, footer, main, constants,
  writeReview, overallReview, preSalesReview, salesReview, postSalesReview,
  util, companySignup, companySignupSuccess, userProfile, userReview, userRecommendation, hired,
  userGroups, userCompanies, userRfp, groupJoin, followCompanies, rfp, Reviews, hireMe, useradditionalinfoone, resetpassword, useradditionalinfotwo,
  companyLogin, writereviewsignup, overallReviewSignup, postSalesReviewSignup, preSalesReviewSignup, salesReviewSignup, postPopup,
  masterService, forgotPassword, searchHired, ngMessages, 'ngTagsInput', searchRfp, companyProfile, createReviewTwo, userpublic,
  mfactory, SearchBarComponent, LeftNavComponent, NotificationPanelComponent, companyProfile, adminDashboard, adminUsers, adminReview, adminHire, Company, rfpAdmin, uploadMasterAdmin, adminResetpassword, adminLogin
])
  .config(routeConfig)
  .run(function($rootScope, $state, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('main');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['salesdoorApp'], {
      strictDi: true
    });
  });

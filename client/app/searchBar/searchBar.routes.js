'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('searchBar', {
      url: '/searchBar',
      template: '<search-bar></search-bar>'
    });
}

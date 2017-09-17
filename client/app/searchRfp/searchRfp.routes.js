'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('searchRfp', {
      url: '/searchRfp',
      template: '<search-rfp></search-rfp>'
    });
}

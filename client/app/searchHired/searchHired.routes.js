'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('searchHired', {
      url: '/searchHired',
      template: '<search-hired></search-hired>',
      authenticate: 'user'
    });
}

'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('leftNav', {
      url: '/leftNav',
      template: '<left-nav></left-nav>'
    });
}

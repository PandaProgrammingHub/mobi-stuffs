'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userpublic', {
      url: '/userpublic?:id',
      template: '<userpublic></userpublic>'
    });
}

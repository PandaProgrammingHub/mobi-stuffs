'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('followCompanies', {
      url: '/followCompanies',
      template: '<follow-companies></follow-companies>'
    });
}

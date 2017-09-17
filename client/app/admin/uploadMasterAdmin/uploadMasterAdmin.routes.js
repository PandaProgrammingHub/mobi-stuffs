'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('uploadMasterAdmin', {
      url: '/admin/uploadmaster',
      template: '<upload-master-admin></upload-master-admin>'
    });
}


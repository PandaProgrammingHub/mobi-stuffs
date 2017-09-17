//
// 'use strict';
// const angular = require('angular');
//
//
// import routes from './postPopup.routes';
// import PostPopupController from './postPopup.controller';
//
//
// export default angular.module('salesdoorApp.postPopup', [])
//   .config(routes)
//   .component('postPopup', {
//     template: require('./postPopup.html'),
//     controller: PostPopupController,
//     controllerAs: 'postPopupCtrl'
//   })
//   .name;


'use strict';

import angular from 'angular';
import PostPopupController from './postPopup.controller';

export default angular.module('salesdoorApp.postPopup', [])
  .component('postPopup', {
    template: require('./postPopup.html'),
    controller: PostPopupController,
    controllerAs: '$ctrl'
  })
  .name;



/**
 * Created by amit on 18/8/17.
 */
'use strict';

import angular from 'angular';
import FooterController from './footer.controller';

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterController,
    controllerAs: '$ctrl'
  })
  .name;

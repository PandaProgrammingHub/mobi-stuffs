import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  companyResponse = [];
  newCompany = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  addThing() {
    if(this.newCompany) {
      this.$http.post('/api/things', {
        name: this.newCompany
      });
      this.newCompany = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('salesdoorApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;

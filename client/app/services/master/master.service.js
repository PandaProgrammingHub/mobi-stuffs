'use strict';
const angular = require('angular');


import {environment} from '../../../environments/environment';
import profileCtrl from '../../user/profile/profile.component';
/*@ngInject*/
export function masterService($http) {
  'ngInject';
  // AngularJS will instantiate a singleton by calling "new" on this function
  this.getCompanies = function () {
    var url = environment.url;
    url = url + 'companies';
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  };

  this.getCompanyDtlById = function (id) {
    var url = environment.url;
    url = url + 'companies/' + id;
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  };


  this.getLocations = function () {
    var url = environment.url;
    url = url + 'locations';
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  };

  this.getGroups = function () {
    var url = environment.url;
    url = url + 'groups';
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  };

  this.getProducts = function () {
    var url = environment.url;
    url = url + 'products';
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  };

  this.getGroups = function () {
    var url = environment.url;
    url = url + 'groups';
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }

  this.getSearchResults = function (searchText, type) {
    var url = environment.url;
    var completeUrl = url + 'search?searchText=' + searchText + '&type=' + type;
    return $http.get(completeUrl)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }

  this.getUserProfile = function (id) {
    var url = environment.url;
    url = url + 'users/' + id;
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }

  this.getPublicUserHired = function (id) {
    var url = environment.url + 'hireds/filterByUserId/' + id;
    return $http.get(url).then(function success(response) {
      return response;
    })
      .catch(function error(revErr) {
        return revErr;
      });
  }

  this.getUserReviews = function (id) {
    var url = environment.url + 'reviews/' + id;
    return $http.get(url).then(function success(response) {
        return response;
      })
      .catch(function error(revErr) {
        return revErr;
      });
  }

  this.deleteReview = function(id)  {
    var url = environment.url + 'reviews/' + id;
    return $http.delete(url).then(function success(response) {
      return response;
    })
    .catch(function error(remErr) {
      return remErr;
    });
  }

  this.saveRecommendation = function(recObj) {
    var url = environment.url + 'recommendations';
    return $http.post(url, recObj).then(function success(response) {
      return response;
    })
    .catch(function error(recErr) {
      return recErr;
    });
  }

  this.getUserRecommendations = function(id) {
    var url = environment.url + 'recommendations/' + id;
    return $http.get(url).then(function success(response) {
        return response;
      })
      .catch(function error(revErr) {
        return revErr;
      });
  }

  this.getFollowedCompanies = function (comData) {
    var url = environment.url;
    url = url + '/companies/getFollowedCompanies';
    return $http.post(url, {comArr: comData})
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  };

  this.getRfpById = function (id) {
    var url = environment.url;
    url = url + 'rfps/filterByUserId/' + id;
    return $http.get(url)
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  };

  this.addInfo = function (userData) {
    var url = environment.url;
    url = url + 'users/additionalinfo';
    console.log(url)
    return $http.post(url, userData)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }
  this.searchHiredResult = function (searchText, type) {
    var url = environment.url;
    url = url + 'search?searchText=' + searchText + '&type=' + type;
    console.log('url',url);
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }

 this.searchRfpResult = function (searchText, type) {
    var url = environment.url;
    url = url + 'search?searchText=' + searchText + '&type=' + type;
    return $http.get(url)
      .then(function success(response) {
        return response;
      }).catch(function error(error) {
        return error;
      });
  }

  this.getCompanyReviews = function (id) {
    var url = environment.url + 'reviews/company/' + id;
    return $http.get(url)
      .then(function success(response) {
        return response;
      })
      .catch(function error(revErr) {
        return revErr;
      });
  };

  this.deleteCompanyResult = function (idValue) {
    var url = environment.url;
    url = url + '/companies/' + idValue;
    return $http.delete(url)
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  };

  this.updateCompanyRecord = function (updatedCompanyValue) {
    var url = environment.url;
    var idValue = updatedCompanyValue._id;
    var dataValue = updatedCompanyValue;
    url = url + 'companies/' + idValue;
    return $http.put(url, dataValue)
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  };

//createCompanyRecord

  this.createCompanyRecord = function(createCompanyValue) {
    var url = environment.url;
    url = url + 'companies/';
    return $http.post(url, createCompanyValue)
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  };
  this.updateCompanyResponse = function(userObject){
    var url = environment.url;
    url = url + 'reviews/' + userObject._id;
    return $http.put(url, userObject)
      .then(function success(response) {
        return response;
      })
      .catch(function error(error) {
        return error;
      });
  }

  this.getcompanylist = function (page,limit) {
    var url = environment.url;
    url = url + 'companies?page='+page+'&limit='+limit;
    return $http.get(url)
      .then(function success(response) {
        console.log('cvbn',response);
        return response;
      }).catch(function error(error) {
        return error;
      });
  };
}

export default angular.module('saleroorApp.masterService', [])
  .service('master', masterService)
  .name;

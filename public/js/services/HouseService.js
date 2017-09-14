angular.module('HouseService', [])
  .factory('HouseService', ['$http', function($http) {
    const urlBase = 'api/v1/houses';

    return {
      get : () => {
        return $http.get(urlBase);
      },

      create : () => {
        return $http.post(urlBase, houseData);
      },

      show : (id) => {
        // return "success";
        return $http.get(urlBase + "/" + id);
      },

      delete : (id) => {
        return $http.delete(urlBase + "/" + id);
      }
    };
  }]);
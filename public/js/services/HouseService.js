angular.module('HouseService', [])
  .factory('HouseService', ['$http', function($http) {
    const urlBase = 'api/v1/houses';

    return {
      get : () => {
        return $http.get(urlBase);
      },

      create : (houseData) => {
        return $http.post(urlBase, houseData);
      },

      show : (id) => {
        return $http.get(urlBase + "/" + id);
      },

      edit : (houseData) => {
        return $http.put(urlBase + "/" + houseData._id, houseData);
      },

      delete : (id) => {
        return $http.delete(urlBase + "/" + id);
      }
    };
  }]);
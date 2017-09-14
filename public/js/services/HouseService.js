angular.module('HouseService', [])
  .factory('House', ['$http', function($http) {
    return {
      get : () => {
        return $http.get('/api/houses');
      },

      create : () => {
        return $http.post('/api/houses', houseData);
      },

      delete : (id) => {
        return $http.delete('/api/houses/' + id);
      }
    };
  }]);
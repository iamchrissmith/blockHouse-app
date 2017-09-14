angular.module('HouseService', [])
  .factory('Houses', ['$http', function($http) {
    const urlBase = 'api/v1/houses';

    // this.get = () => {
    //   return $http.get(`${urlBase}`);
    // };

    // this.create = () => {
    //   return $http.post(`${urlBase}`, houseData);
    // };

    // this.show = (id) => {
    //   return $http.get(`${urlBase}/${id}`);
    // };

    // this.update = (id) => {
    //   return $http.put(`${urlBase}/${id}`, houseData);
    // };

    // this.delete = (id) => {
    //   return $http.delete(`${urlBase}/${id}`);
    // };

    return {
      get : () => {
        return $http.get(urlBase);
      },

      create : () => {
        return $http.post(urlBase, houseData);
      },

      delete : (id) => {
        return $http.delete(urlBase + id);
      }
    };
  }]);
angular.module('HouseCtrl', [])
  .controller('HouseController', function($scope, Houses) {
    $scope.houses = [];
    $scope.status;

    const getHouses = () => {
      Houses.get()
        .then( response => {
          $scope.houses = response.data;
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    getHouses();
  });
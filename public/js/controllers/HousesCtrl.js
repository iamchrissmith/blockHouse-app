angular.module('HousesCtrl', [])
  .controller('HousesController', function($scope, HouseService) {
    $scope.houses = [];
    $scope.status;

    const getHouses = () => {
      HouseService.get()
        .then( response => {
          $scope.status = '';
          $scope.houses = response.data;
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    getHouses();
  });
angular.module('HouseCtrl', [])
  .controller('HouseController', function($scope, $routeParams, HouseService) {
    $scope.house = {};
    $scope.status;

    const showHouse = () => {
      HouseService.show($routeParams.house_id)
        .then( response => {
          $scope.status = response.data;
          $scope.house = response.data;
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    showHouse();
  });
angular.module('HouseCreateCtrl', [])
  .controller('CreateHouseController', function($scope, $routeParams, HouseService) {
    $scope.newHouse = {};
    
    $scope.createHouse = () => {
      console.log($scope.newHouse);
      $scope.newHouse = {}
      // HouseService.show($routeParams.house_id)
      //   .then( response => {
      //     $scope.house = response.data;
      //   }, err => {
      //     $scope.status = `Unable to load house data: ${err.message}`;
      //   });
    };
  });
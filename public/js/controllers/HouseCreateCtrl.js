angular.module('HouseCreateCtrl', [])
  .controller('CreateHouseController', function($location, $scope, $routeParams, HouseService) {
    $scope.house = {};
    
    $scope.createHouse = () => {
      const newHouse = $scope.house;
      $scope.house = {};
      newHouse.address = "0x000"; // need to get the real address from the blockchain.
      HouseService.create(newHouse)
        .then( response => {
          console.log(response.data);
          $location.url(`/houses/${response.data.id}`);
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };
  });
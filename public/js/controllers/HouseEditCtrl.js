angular.module('HouseEditCtrl', [])
  .controller('EditHouseController', function($location, $scope, $routeParams, HouseService) {
    $scope.house = {};

    const showHouse = () => {
      HouseService.show($routeParams.house_id)
        .then( response => {
          $scope.house = response.data;
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    showHouse();
    
    $scope.editHouse = () => {
      console.log($scope.house);
      HouseService.edit($scope.house)
        .then( response => {
          console.log(response.data);
          $location.url(`/houses/${response.data.house._id}`);
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };
  });
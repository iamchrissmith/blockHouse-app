angular.module('HouseEditCtrl', [])
  .controller('EditHouseController', function($location, $scope, $routeParams, HouseService, $rootScope) {
    $scope.house = {};

    const showHouse = () => {
      HouseService.show($routeParams.house_id)
        .then( response => {
          if ($rootScope.selectedAccount != response.data.owner) {
            $location.url(`/houses/${$routeParams.house_id}`);
          }
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
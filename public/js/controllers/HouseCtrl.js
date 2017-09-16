angular.module('HouseCtrl', [])
  .controller('HouseController', function($scope, $routeParams, HouseService, $rootScope) {
    $scope.house = {};
    $scope.status;

    const showHouse = () => {
      HouseService.show($routeParams.house_id)
        .then( response => {
          $scope.house = response.data;
          $scope.house.priceInEth = $rootScope.web3.fromWei($scope.house.price, "ether");
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    showHouse();
  });
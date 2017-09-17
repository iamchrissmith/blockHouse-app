angular.module('HousesCtrl', [])
  .controller('HousesController', function($scope, HouseService, $rootScope) {
    $scope.houses = [];
    $scope.status;

    const getHouses = () => {
      HouseService.get()
        .then( response => {
          $scope.status = '';
          $scope.houses = response.data.map( house => {
            house.priceInEth = $rootScope.web3.fromWei(house.price, "ether");
            return house;
          });
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    getHouses();
  });
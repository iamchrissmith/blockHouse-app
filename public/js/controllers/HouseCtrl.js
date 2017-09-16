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

    const saveHouseData = () => {
      HouseService.edit($scope.house)
      .then( response => {
        console.log(response.data);
      }, err => {
        $scope.status = `Unable to load house data: ${err.message}`;
      });
    };

    $scope.buyHouse = () => {
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      if($scope.house.owner == $rootScope.selectedAccount)
        return;
      
      chainHouse.buyHouse({from:$rootScope.selectedAccount, value:$scope.house.price})
        .then( tx => {
          console.log(tx);
          $scope.house.forSale = false;
          $scope.house.owner = $rootScope.selectedAccount;
          $rootScope.updateBalance();
          saveHouseData();
        });
    };
  });
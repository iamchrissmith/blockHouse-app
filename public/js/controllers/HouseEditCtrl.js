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
    
    $scope.updateHouseDetails = () => {
      console.log("House Details", $scope.house);
      saveHouseData();
    };

    const saveHouseData = () => {
      HouseService.edit($scope.house)
      .then( response => {
        console.log("Response details: ", response.data);
        $location.url(`/houses/${response.data.house._id}`);
      }, err => {
        $scope.status = `Unable to load house data: ${err.message}`;
      });
    };

    $scope.updatePrice = () => {
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      chainHouse.updatePrice($scope.house.price, {from:$rootScope.selectedAccount})
      .then( tx => {
        console.log("price: ", tx);
        saveHouseData();   
      });
    };

    $scope.updateForSale = (_forSale) => {
      $scope.house.forSale = _forSale;
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      if (!_forSale) {
        chainHouse.stopSelling({from:$rootScope.selectedAccount})
          .then( tx => {
            console.log("stop: ",tx);
            saveHouseData();   
          });
      } else {
        chainHouse.startSelling({from:$rootScope.selectedAccount})
          .then( tx => {
            console.log("start: ", tx);
            return chainHouse.updatePrice($scope.house.price, {from:$rootScope.selectedAccount});
          })
          .then( tx => {
            console.log("price: ", tx);
            saveHouseData();   
          });
      }
    };

    $scope.transferOwnership = (newOwner) => {
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      chainHouse.changeTitleHolder(newOwner, {from:$rootScope.selectedAccount})
      .then( tx => {
        $scope.house.owner = newOwner;
        saveHouseData();
        })
    }
  });
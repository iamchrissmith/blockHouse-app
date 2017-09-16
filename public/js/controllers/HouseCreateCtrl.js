angular.module('HouseCreateCtrl', [])
  .controller('CreateHouseController', function($location, $scope, $routeParams, HouseService, $rootScope) {
    $scope.house = {};

    if (!$rootScope.isAdmin) {
      $location.url('/houses');
    }
    
    $scope.createHouse = () => {
      const newHouse = $scope.house;
      if (!$scope.house.price)
        newHouse.price = 0;
      $scope.house = {};
      $rootScope.contract.isAdmin($rootScope.selectedAccount, {from:$rootScope.selectedAccount})
        .then( _isAdmin => {
          if(!_isAdmin)
            return;

          return $rootScope.contract.newHouse(
                                newHouse.owner,
                                newHouse.price,
                                newHouse.forSale,
                                {from: $rootScope.selectedAccount, gas: 4000000});
        })
        .then( tx => {
          newHouse.address = tx.logs[0].args.house; // need to get the real address from the blockchain.
          HouseService.create(newHouse)
          .then( response => {
            $location.url(`/houses/${response.data.id}`);
          }, err => {
              $scope.status = `Unable to load house data: ${err.message}`;
          });
        });
    };
  });
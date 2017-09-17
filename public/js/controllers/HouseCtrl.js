angular.module('HouseCtrl', [])
  .controller('HouseController', function($scope, $routeParams, HouseService, $rootScope) {
    $scope.house = {};
    $scope.history = [];
    $scope.status = '';

    $scope.$watch(() => {
      return $rootScope.selectedAccount;
    }, (newValue, oldValue) => {
      if( !newValue || !oldValue || newValue == oldValue)
        return;
      $scope.house.yourBalance = 0;
      if ($scope.house.address) {
        const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
        chainHouse.balances.call($rootScope.selectedAccount, {from:$rootScope.selectedAccount})
          .then( _balance => {
            $scope.house.yourBalance = parseInt(_balance.toString(10));
            $scope.house.yourBalanceInEth = $rootScope.web3.fromWei($scope.house.yourBalance, "ether");
            $scope.$apply();
          });
      }
    });

    const showHouse = () => {
      HouseService.show($routeParams.house_id)
        .then( response => {
          $scope.house = response.data;
          if ($scope.house.price) {
            $scope.house.price = parseInt($scope.house.price.toString(10));
            $scope.house.priceInEth = $rootScope.web3.fromWei($scope.house.price, "ether");
            watchHouseUpdates();
          }
          if ($scope.house.address) {
            const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
            chainHouse.balances.call($rootScope.selectedAccount, {from:$rootScope.selectedAccount})
              .then( _balance => {
                $scope.house.yourBalance = parseInt(_balance.toString(10));
                $scope.house.yourBalanceInEth = $rootScope.web3.fromWei($scope.house.yourBalance, "ether");
              });
          }
        }, err => {
          $scope.status = `Unable to load house data: ${err.message}`;
        });
    };

    showHouse();

    const watchHouseUpdates = () => {
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      $scope.saleWatcher = chainHouse.LogSale({}, {fromBlock:0})
        .watch( saveSaleEvent );
      $scope.updateWatcher = chainHouse.LogUpdatedHouse({}, {fromBlock:0})
        .watch( saveUpdateEvent );
    };

    const saveUpdateEvent = (err, event) => {
      console.log(event);
      const thisEvent = {
        title: event.event.replace('Log',''),
        sender: event.args.sender,
        forSale: event.args.isForSale,
        price: parseInt(event.args.housePrice.toString(10)),
        blockNumber: event.blockNumber
      };
      thisEvent.priceInEth = $rootScope.web3.fromWei(thisEvent.price, "ether");
      $scope.history.push(thisEvent);
    };

    const saveSaleEvent = (err, event) => {
      const thisEvent = {
        title: event.event.replace('Log',''),
        seller: event.args.seller,
        buyer: event.args.buyer,
        amount: parseInt(event.args.amount.toString(10)),
        blockNumber: event.blockNumber
      };
      thisEvent.amountInEth = $rootScope.web3.fromWei(thisEvent.amount, "ether");
      $scope.history.push(thisEvent);
    }

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
          $scope.house.forSale = false;
          $scope.house.owner = $rootScope.selectedAccount;
          $rootScope.updateBalance();
          saveHouseData();
        });
    };

    $scope.withdraw = () => {
      const chainHouse = $rootScope.BlockHouse.at($scope.house.address);
      chainHouse.withdrawFunds({from:$rootScope.selectedAccount})
        .then( tx => {
          console.log(tx);
          $rootScope.updateBalance();
          $scope.house.yourBalance = '';
        });
    };
  });
angular.module('MainCtrl',[])
  .controller('MainController', function($scope) {
    
    BlockHub.deployed()
    .then( _instance => {
      $scope.contract = _instance;
      return $scope.contract.owner.call({from:$scope.account});
    })
    .then( _owner => {
      $scope.contract.owner = _owner;
    });

    // Work with the first account    
    web3.eth.getAccountsPromise()
    .then(accounts => {
        if (accounts.length == 0) {
            throw new Error("No account with which to transact");
        }
        $scope.accounts = accounts;
        console.log("Other Accounts: ", $scope.accounts);
        $scope.account = $scope.accounts[0];
        $scope.account = address;
        console.log("ACCOUNT:", $scope.account);
        $scope.selectedAccount = $scope.account;
        $scope.$apply();
    }); 
  });
angular.module('AdminCtrl', [])
  .controller('AdminController', function($scope, $routeParams, HouseService, $rootScope, $location){
    $scope.adminAccounts = [];
    $scope.loading = true;

    const loadAdmins = () => {
      if(!$rootScope.contract || !$rootScope.selectedAccount || $rootScope.selectedAccount != $rootScope.contractOwner) {
        $location.url('/houses');
        return;
      }

      let adminCount;
      console.log("admin");
      $rootScope.contract.getAdminCount.call()
      .then( _count => {
        adminCount = parseInt(_count.toString(10));
        for(let i = 0; i < adminCount; i++){
          $rootScope.contract.getAdminAtIndex.call(i)
          .then( _admin => {
            if ($scope.loading == true) {
              $scope.loading = false;
            }
            $scope.adminAccounts.push(_admin);
            $scope.$apply();
          });
        }
      });
    };

    loadAdmins();

    $scope.addAdmin = () => {
      console.log($scope.newAdmin);
      if ($rootScope.selectedAccount != $rootScope.contractOwner)
        return;
      $rootScope.contract.addAdmin($scope.newAdmin, {from:$rootScope.selectedAccount, gas: 4000000})
        .then( tx => {
          $scope.adminAccounts.push($scope.newAdmin);
          $scope.newAdmin = '';
          $scope.$apply();
        });
    };

    $scope.removeAdmin = (address) => {
      console.log(address);
      if (address == $rootScope.selectedAccount)
        return;
      $rootScope.contract.removeAdmin(address, {from:$rootScope.selectedAccount})
        .then( tx => {
          console.log(tx);
          const toDelete = $scope.adminAccounts.indexOf(address);
          $scope.adminAccounts.splice(toDelete,1);
          console.log($scope.adminAccounts);
          $scope.$apply();
        });
    };
  });
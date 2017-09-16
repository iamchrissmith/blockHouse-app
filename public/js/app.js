const Web3 = require("web3");
const Promise = require("bluebird");
const truffleContract = require("truffle-contract");

const BlockHubJson = require("../../../blockHouses-contracts/build/contracts/BlockHub.json");
const BlockHouseJson = require('../../../blockHouses-contracts/build/contracts/BlockHouse.json');

window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 

// Supports Mist, and other wallets that provide 'web3'.
// if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    // window.web3 = new Web3(web3.currentProvider);
// } else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
// }


const BlockHub = truffleContract(BlockHubJson);
BlockHub.setProvider(web3.currentProvider);

const BlockHouse = truffleContract(BlockHouseJson);
BlockHouse.setProvider(web3.currentProvider);

Promise.promisifyAll(web3.eth, { suffix: "Promise" });
Promise.promisifyAll(web3.version, { suffix: "Promise" });

require('./controllers/HousesCtrl');
require('./controllers/HouseCreateCtrl');
require('./controllers/HouseEditCtrl');
require('./controllers/HouseCtrl');
require('./services/HouseService');
require('./appRoutes');

angular.module('BlockHouses',
  [
    'ngRoute', 
    'appRoutes', 
    'MainCtrl', 
    'HousesCtrl',
    'HouseCreateCtrl', 
    'HouseEditCtrl', 
    'HouseCtrl', 
    'HouseService'
  ])
  .run( ($rootScope) => {

    $rootScope.BlockHouse = BlockHouse;
    $rootScope.web3 = web3;

    BlockHub.deployed()
    .then( _instance => {
      $rootScope.contract = _instance;
      return $rootScope.contract.owner.call({from:$rootScope.selectedAccount});
    })
    .then( _owner => {
      $rootScope.contract.owner = _owner;
      $rootScope.$apply();
    });

    // Start with the first
    web3.eth.getAccountsPromise()
    .then(accounts => {
        if (accounts.length == 0) {
            throw new Error("No account with which to transact");
        }
        $rootScope.accounts = accounts;
        console.log("Other Accounts: ", $rootScope.accounts);
        $rootScope.changeAccount(accounts[0]);
      });
      
    $rootScope.changeAccount = (address) => {
      $rootScope.selectedAccount = address;
      console.log("ACCOUNT:", $rootScope.selectedAccount);
      setSelectedAccountDetails();
    }

    const setSelectedAccountDetails = () => {
      $rootScope.contract.isAdmin($rootScope.selectedAccount, {from:$rootScope.selectedAccount})
      .then(_isAdmin => {
        $rootScope.isAdmin = _isAdmin;
        $rootScope.updateBalance();
      });
    };

    $rootScope.updateBalance = () => {
      web3.eth.getBalancePromise($rootScope.selectedAccount)
        .then ( _balance => {
          $rootScope.balance = _balance.toString(10);
          $rootScope.balanceInEth = web3.fromWei($rootScope.balance, "ether");
          $rootScope.selectedCurrency = 'ether';
          $rootScope.$apply();
        });
    };
  });

  angular.module('MainCtrl',[])
  .controller('MainController', function($rootScope) {

    

  });
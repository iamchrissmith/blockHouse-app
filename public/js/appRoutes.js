angular.module('appRoutes', [])
  .config(
    ['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'MainController'
        })

        .when('/houses', {
          templateUrl: 'views/houses.html',
          controller: 'HousesController'
        })

        .when('/houses/new', {
          templateUrl: 'views/create.html',
          controller: 'CreateHouseController'
        })

        .when('/houses/:house_id', {
          templateUrl: 'views/show.html',
          controller: 'HouseController'
        });

      $locationProvider.html5Mode(true);
    }]);
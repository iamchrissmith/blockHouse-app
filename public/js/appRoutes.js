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
          controller: 'HouseController'
        })

        .when('/houses/:house_id', {
          templateUrl: 'views/show.html',
          controller: 'HouseController'
        });

      $locationProvider.html5Mode(true);
    }]);
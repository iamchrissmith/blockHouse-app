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
        });

      $locationProvider.html5Mode(true);
    }]);
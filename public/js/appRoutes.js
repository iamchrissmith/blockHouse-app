angular.module('appRoutes', [])
  .config(
    ['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'MainController'
        })

        .when('/admins', {
          templateUrl: 'views/admin.html',
          controller: 'AdminController'
        })

        .when('/houses', {
          templateUrl: 'views/houses.html',
          controller: 'HousesController'
        })

        .when('/houses/new', {
          templateUrl: 'views/create.html',
          controller: 'CreateHouseController'
        })

        .when('/houses/:house_id/edit', {
          templateUrl: 'views/edit.html',
          controller: 'EditHouseController'
        })

        .when('/houses/:house_id', {
          templateUrl: 'views/show.html',
          controller: 'HouseController'
        });

      $locationProvider.html5Mode(true);
    }]);
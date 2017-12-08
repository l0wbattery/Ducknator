angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'home.html',
        controller: 'desktopController'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
    .otherwise('/home')
});

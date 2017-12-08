angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'index.html',
        controller: 'desktopController'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
    .otherwise('/home')
});

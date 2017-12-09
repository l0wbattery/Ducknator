angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        controller: 'desktopController',
        templateUrl: 'desktop.html'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
    .otherwise('/home')
});

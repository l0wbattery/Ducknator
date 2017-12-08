angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'Home/home.html',
        controller: 'desktopController'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
    .when('/nick',{
        templateUrl: 'TelaDeToken/informa.token.html',
        controller: 'mobileController'
    })
    .otherwise('/home')
});

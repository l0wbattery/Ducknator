angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        controller: 'desktopController',
        templateUrl: 'desktop.html'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })

    .when('/tutorial',{
        templateUrl: 'TelaTutorial/telaTutorial.html',
        controller: 'tutorialController'
    })
    .otherwise('/home')
});

angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'home.html',
        controller: 'homeController'
    })
    .when('/desktopteste',{
        templateUrl: 'desktop.html',
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

    .when('/telajogo',{
        templateUrl: '/TelaDeJogo/telaDeJogo.html',
        controller: 'jogoController'
    })

    .otherwise('/desktopteste')

});

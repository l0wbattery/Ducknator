angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'Home/home.html',
        controller: 'desktopController'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
<<<<<<< HEAD
    .when('/nick',{
        templateUrl: 'TelaDeToken/informa.token.html',
        controller: 'mobileController'
    })
=======

    .when('/telajogo',{
        templateUrl: '/TelaDeJogo/telaDeJogo.html',
        controller: 'jogoController'
    })

>>>>>>> ef0b40ec0b9de6ef2b4446cb65e198017c6b60b4
    .otherwise('/home')
});

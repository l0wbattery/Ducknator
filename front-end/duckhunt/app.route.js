angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'Home/home.html',
        controller: 'desktopController'
    })
    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
    .when('/token',{
        templateUrl: 'TelaDeToken/informa.token.html',
        controller: 'mobileController'
    })

    .when('/telajogo',{
        templateUrl: '/TelaDeJogo/telaDeJogo.html',
        controller: 'jogoController'
    })

    .when('/nick',{
        templateUrl: '/TelaDeNome/informa.nome.html',
        controller: 'jogoController'
    })

    .otherwise('/home')
});

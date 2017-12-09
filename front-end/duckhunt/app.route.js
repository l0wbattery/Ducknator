angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'Home/home.html',
        controller: 'homeController'
    })
    .when('/desktopteste',{
        templateUrl: 'desktop.html',
        controller: 'desktopController'
    })

    .when('/mobileplay',{
        templateUrl: 'TelaJogoMobile/tela.jogo.html',
        controller: 'mobilePlayController'
    })

    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })

    .when('/nick',{
        templateUrl: 'TelaDeNome/informa.nome.html',
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
    .otherwise('/desktopteste')

});

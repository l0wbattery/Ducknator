angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
<<<<<<< HEAD
        templateUrl: 'Home/home.html',
        controller: 'homeController'
    })
    .when('/desktopteste',{
        templateUrl: 'desktop.html',
        controller: 'desktopController'
=======
        controller: 'desktopController',
        templateUrl: 'desktop.html'
>>>>>>> 25283c01e775f97cf3fc99d9a26c3c6e7677d596
    })

    .when('/mobileplay',{
        templateUrl: 'TelaJogoMobile/tela.jogo.html',
        controller: 'mobilePlayController'
    })

    .when('/mobile',{
        templateUrl: 'mobile.html',
        controller: 'mobileController'
    })
<<<<<<< HEAD

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

=======
    .otherwise('/home')
>>>>>>> 25283c01e775f97cf3fc99d9a26c3c6e7677d596
});

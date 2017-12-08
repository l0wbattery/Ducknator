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
<<<<<<< HEAD
    .when('/token',{
=======
    .when('/nick',{
>>>>>>> 587424041ef0733f13a3f104b6f58f28e8b5d6c7
        templateUrl: 'TelaDeToken/informa.token.html',
        controller: 'mobileController'
    })

    .when('/telajogo',{
        templateUrl: '/TelaDeJogo/telaDeJogo.html',
        controller: 'jogoController'
    })

<<<<<<< HEAD
    .when('/nick',{
        templateUrl: '/TelaDeNome/informa.nome.html',
        controller: 'jogoController'
    })

    .otherwise('/home')
=======
    .otherwise('/desktopteste')

>>>>>>> 587424041ef0733f13a3f104b6f58f28e8b5d6c7
});

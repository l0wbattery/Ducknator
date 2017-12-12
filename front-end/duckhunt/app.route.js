angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
        templateUrl: 'Teste/desktop.html',
        controller: 'desktopController'

    })
    .when('/mobile',{
        templateUrl: 'TelaJogoMobile/mobile.html',
        controller: 'mobileController'
    })

    .when('/tutorial',{
        templateUrl: 'TelaTutorial/telaTutorial.html',
        controller: 'tutorialController'
    })
    .when('/ducknator', {
      templateUrl: 'Home/home.html',
      controller: 'homeController'
    })
    .when('/jogo', {
      templateUrl: 'TelaDeJogo/telaDeJogo.html',
      controller: 'jogoController'
    })
    .when('/nick', {
      templateUrl: 'TelaDeNome/informa.nome.html',
      controller: 'nickController'
    })
    .when('/token', {
      templateUrl: 'TelaDeToken/informa.token.html',
      controller: 'tokenController'
    })

    .otherwise('/ducknator')
});

angular.module('duckHunt').config(function ($routeProvider){
    $routeProvider.when('/home',{
<<<<<<< HEAD
        templateUrl: 'home.html',
        controller: 'homeController'
    })
    .when('/desktopteste',{
        templateUrl: 'desktop.html',
=======
        templateUrl: 'Home/home.html',
>>>>>>> 210df4cc192bd4b524eefa6f2dda91bdfeab426f
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

<<<<<<< HEAD
    .otherwise('/desktopteste')
=======
>>>>>>> ef0b40ec0b9de6ef2b4446cb65e198017c6b60b4
    .otherwise('/home')
>>>>>>> 210df4cc192bd4b524eefa6f2dda91bdfeab426f
});

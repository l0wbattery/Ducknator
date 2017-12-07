angular.module('app').config(function ($routeProvider) {

  $routeProvider

    // pública
    .when('/home', {
      controller: 'HomeController',
      templateUrl: 'home/home.html'
    })

    // pública
    .when('/login', {
      controller: 'LoginController',
      templateUrl: 'login/login.html'
    })

    .when('/usuario/:idUsuario?', {
      controller: 'UsuarioController',
      templateUrl: 'usuario/usuario.html'
    })

    .when('/trecho/:idTrecho?', {
      controller: 'TrechoController',
      templateUrl: 'trecho/trecho.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })
    .when('/trecholistar', {
      controller: 'TrechoListarController',
      templateUrl: 'trecho/trechoListar.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })

    .when('/local/:idLocal?', {
      controller: 'LocalController',
      templateUrl: 'local/local.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })
    .when('/locallistar', {
      controller: 'LocalListarController',
      templateUrl: 'local/localListar.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })

    //opcionais
    .when('/opcional/:idOpcional?', {
      controller: 'OpcionalController',
      templateUrl: 'opcional/opcional.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })

    .when('/opcionallistar', {
      controller: 'OpcionalListarController',
      templateUrl: 'opcional/opcionalListar.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })
    //classe de voo
    .when('/classedevoo/:idClasseDeVoo?', {
      controller: 'ClasseDeVooController',
      templateUrl: 'classedevoo/classeDeVoo.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })
    .when('/classedevoolistar', {
      controller: 'ClasseDeVooListarController',
      templateUrl: 'classedevoo/classeDeVooListar.html',
      resolve: {
        autenticado: function (authService) {
         return authService.isAdminPromise();
       }
     }
    })

    .when('/reserva', {
      controller: 'ReservaController',
      templateUrl: 'reserva/reserva.html',
      resolve: {
         autenticado: function (authService) {
          return authService.isAutenticadoPromise();
        }
      }
    })

    // privado
    .when('/privado', {
      controller: 'PrivadoController',
      templateUrl: 'privado/privado.html',
      resolve: {

        // define que para acessar esta página deve ser um usuário autenticado (mas não restringe o tipo de permissão)
        autenticado: function (authService) {
          return authService.isAutenticadoPromise();
        }
      }
    })

    .otherwise('/home');
});

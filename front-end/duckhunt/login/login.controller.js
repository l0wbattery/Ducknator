angular.module('app').controller('LoginController', function ($scope, authService,toastr) {

  $scope.login = function (usuario) {

    authService.login(usuario)
      .then(
        function (response) {
          toastr.success('Login realizado com sucesso', 'Login');

        },
        function (response) {
          toastr.error('Usuário e/ou senha incorretos!', 'Login');
        });
  };

});
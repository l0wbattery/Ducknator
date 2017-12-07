angular.module('app').controller('PrivadoController', function ($scope, authService, autenticado) {

  console.log(autenticado);

  $scope.auth = authService;

  $scope.mensagem = {
    colaborador: 'VOCÊ NÃO TEM PERMISSÃO PARA ACESSAR A PAGINA SOLICITADA',
    administrador: 'Mensagem incrível para o usuário ADMINISTRADOR',
  };

});

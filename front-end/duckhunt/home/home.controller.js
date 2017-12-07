angular.module('app')
  .controller('HomeController', function ($scope, authService, $http) {

    // Cuidado pra não executar a função '()'
    $scope.logout = authService.logout;

    $http.get('http://localhost:3000/api/health').then(function (response) {
      console.log(response.data.dados.situacao);
    });
    
  });

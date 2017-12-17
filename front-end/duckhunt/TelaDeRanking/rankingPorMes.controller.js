angular.module('duckHunt').controller('rankingPorMesController', function ($scope, duckService, $location) {
  duckService.chamaRankingPorMes();
  $scope.partidas = {};
  let dia;
  let mes;
  let ano;
  let data;
  $scope.$on('rankingPorMes', function(event, lista){
    console.log(lista);
    for(let i=0; i<lista.length; i++) {
      data = new Date(lista[i].Data);
      dia = data.getDate();
      mes = data.getMonth() + 1;
      ano = data.getFullYear();
      $scope.partidas[i] = {
        NomeUsuario: lista[i].NomeUsuario,
        Pontos: lista[i].Pontos,
        Data: dia+"/"+mes+"/"+ano
      }
    }
    $scope.$apply();
})


    $scope.voltar = function() {
      $location.path('/ducknator');
      location.reload();
    }
})

angular.module('duckHunt').controller('fimDeJogoController', function($scope, $location) {
  console.log('fim de jogo');

  $scope.recomecar = function() {
    $location.path('/ducknator');
    location.reload();
    $scope.apply();
  }
})

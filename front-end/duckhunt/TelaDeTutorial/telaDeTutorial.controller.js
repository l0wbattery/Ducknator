angular.module('duckHunt').controller('tutorialController', function ($scope, duckService) {
    
        var pontuacao = 10;
        var disparos = 3;
        var rodada = 1;
    
        $scope.dados = {
            score: pontuacao,
            shot: disparos,
            round: rodada
          };
    
    
    });
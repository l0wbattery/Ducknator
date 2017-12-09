angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 1000;
    var rodada = 1;
    var disparo = 3;

    console.log("TESTSE");

    $scope.data = {
        score: pontuacao,
        round: rodada,
        shot: disparo
    };


});

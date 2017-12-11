angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 0;
    var rodada = 1;
    var disparo = 3;

    function pad(pontuacao) {
        return (pontuacao < 10) ? ("0" + pontuacao) : pontuacao;
    }

    console.log("TESTE");

    $scope.data = {
        score: pontuacao,
        round: rodada,
        shot: disparo
    };


});

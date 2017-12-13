angular.module('duckHunt').controller('tutorialController', function ($scope, $location, duckService) {

    $scope.patoTutorial = {
        vivo: true,
        pontos: 100,
        tipo: 1
    };

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;

        $scope.mira = "left:" + ($scope.miraX) + "px; top:" + ($scope.miraY) + "px;";
        $scope.$apply();
    });

    //Verifica se a mira está dentro do hitbox do pato;
    


    //Redireciona para a tela de jogo e chama o inicio da partida;
    function removerDiv() {
        duckService.rodaPatosMiniRound();
        $location.path('/jogo');
    }

    //Inicia verificação de acerto do pato tutorial ao receber o sinal de tiro vindo do backend;
    $scope.$on('atirou', function (event, acertou) {
        if(acertou === true){
            $scope.patoTutorial.vivo = false;
        }
    });
});



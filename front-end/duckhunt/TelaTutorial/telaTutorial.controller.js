angular.module('duckHunt').controller('tutorialController', function ($scope, $location, duckService) {

    $scope.miraX = -400;
    $scope.miraY = -300;

    var patoUmVivo = true;
    var patoMorto = document.getElementById("pato");

    $scope.rodaRound = function(){
        duckService.rodaPatosMiniRound();
    }

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;

        $scope.mira = "left:" + ($scope.miraX) + "px; top:" + ($scope.miraY) + "px;";
        $scope.$apply();
    });

    //Verifica se a mira está dentro do hitbox do pato;
    function verificaSeAcertouPatoTutorial() {
        if (($scope.miraY > (patoMorto.offsetTop) - 33) &&
            ($scope.miraY < (patoMorto.offsetTop) + 33) &&
            ($scope.miraX > (patoMorto.offsetLeft) - 41) &&
            ($scope.miraX < (patoMorto.offsetLeft) + 41)) {
            
            eliminarPato();
        }
    }

    //Realiza a nimação do pato sendo atingido e chama a função para faze-lo "cair";
    function eliminarPato() {
        patoMorto.style.animation = "pato-atingido steps(1) forwards 0,5s";
 
        patoMorto.addEventListener("animationend", tirarPatoDaTela);
    }

    //Faz o pato "cair" após ser atingido e inicia função de remoção;
    function tirarPatoDaTela() {

        patoMorto.style.animation = "pato-morrendo 1s forwards linear";

        patoMorto.addEventListener("animationend", removerDiv);
    }

    //Redireciona para a tela de jogo e chama o inicio da partida;
    function removerDiv() {
        duckService.rodaPatosMiniRound();
        $location.path('/jogo');
    }

    //Inicia verificação de acerto do pato tutorial ao receber o sinal de tiro vindo do backend;
    $scope.$on('atirou', function (event, acertou) {
        verificaSeAcertouPatoTutorial();
    });
});



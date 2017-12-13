angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 0000111;
    var rodada = 1;
    var disparo = 3;

    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;
    $scope.isPato1Vivo = true;
    $scope.isPato2Vivo = true;


    //Inicializa o round no servidor
    $scope.rodaRound = function () {
        duckService.rodaRound(duckService.token);
    }

    $scope.$on('patos', function (event, patos) {
        $scope.patos = patos;
        $scope.$apply();
    });

    // Recebe mensagens do servidor para a mira // -----------------------
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.bolaGamma = gamma;
        $scope.bolaAlpha = alpha;
        
        $scope.mira = "top:" + ($scope.bolaAlpha) + "px; left:" + ($scope.bolaGamma) + "px;";
        $scope.$apply();
    });

    //Realiza a nimação do pato sendo atingido e chama a função para faze-lo "cair";
    /*function eliminarPato() {
        pato1.style.animation = "pato-atingido steps(1) forwards 0,5s";

        pato1.addEventListener("animationend", tirarPatoDaTela);
    }

    //Faz o pato "cair" após ser atingido e inicia função de remoção;
    function tirarPatoDaTela() {

        pato1.style.animation = "pato-morrendo 1s forwards linear";

    }*/

    // VERIFICA DISPARO // -----------------------------------------------
    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
        if(acertou )eliminarPato();
        pontuacao += 100;
    });

    


    /*function mudaAnguloDeVoo(posicaoXAnterior, posicaoYAnterior, novaPosicaoX, novaposicaoY, idPato) {
        let patoVoando = document.getElementById(idPato);
        patoVoando.style.transition = "all .0s";

        if ((Number(posicaoXAnterior.slice(0,posicaoXAnterior.length-2))) < novaPosicaoX) {
            patoVoando.style.transform = "scaleX(1)";
        } else {
            patoVoando.style.transform = "scaleX(-1)";
        }

        patoVoando.style.transition = "all 1s";

    }*/

    function pad(pontuacao) {
        return (pontuacao < 10) ? ("0" + pontuacao) : pontuacao;
    }

    $scope.data = {
        score: pontuacao,
        round: rodada,
        shot: disparo
    };


});

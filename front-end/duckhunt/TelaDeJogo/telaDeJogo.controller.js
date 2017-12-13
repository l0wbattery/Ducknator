angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 0000111;
    var rodada = 1;
    var disparo = 3;

    $scope.isPato1Vivo = true;
    $scope.isPato2Vivo = true;

    var mira = document.getElementById("mira");
    var pato1 = document.getElementById("pato1");
    var pato2 = document.getElementById("pato2");

    //Posições Iniciais
    pato1.style.top = "500px";
    pato1.style.left = "600px";

    pato2.style.top = "500px";
    pato2.style.left = "100px";

    var patoUmVivo = true;

    //Inicializa o round no servidor
    $scope.rodaRound = function () {
        duckService.rodaRound();
    }

    // Recebe mensagens do servidor para a mira // -----------------------
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        mira.style.left = gamma + "px";
        mira.style.top = alpha + "px";

        $scope.$apply();
    });

    //Realiza a nimação do pato sendo atingido e chama a função para faze-lo "cair";
    function eliminarPato() {
        pato1.style.animation = "pato-atingido steps(1) forwards 0,5s";

        pato1.addEventListener("animationend", tirarPatoDaTela);
    }

    //Faz o pato "cair" após ser atingido e inicia função de remoção;
    function tirarPatoDaTela() {

        pato1.style.animation = "pato-morrendo 1s forwards linear";

    }

    // VERIFICA DISPARO // -----------------------------------------------
    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
        if(acertou )eliminarPato();
        pontuacao += 100;
    });

    // MOVIMENTA PATOS //-------------------------------------------------
    $scope.$on('pato1', function (event, posicaoPato1) {

        mudaAnguloDeVoo(pato1.style.left, pato1.style.top, posicaoPato1.PosicaoX, posicaoPato1.posicaoY, "pato1");

        pato1.style.top = posicaoPato1.PosicaoY + "px";
        pato1.style.left = posicaoPato1.PosicaoX + "px";

        $scope.$apply();
    });
    $scope.$on('pato2', function (event, posicaoPato2) {

        mudaAnguloDeVoo(pato2.style.left, pato2.style.top, posicaoPato2.PosicaoX, posicaoPato2.posicaoY, "pato2");

        pato2.style.top = posicaoPato2.PosicaoY + "px";
        pato2.style.left = posicaoPato2.PosicaoX + "px";
    });


    function mudaAnguloDeVoo(posicaoXAnterior, posicaoYAnterior, novaPosicaoX, novaposicaoY, idPato) {
        let patoVoando = document.getElementById(idPato);
        patoVoando.style.transition = "all .0s";

        if ((Number(posicaoXAnterior.slice(0,posicaoXAnterior.length-2))) < novaPosicaoX) {
            patoVoando.style.transform = "scaleX(1)";
        } else {
            patoVoando.style.transform = "scaleX(-1)";
        }

        patoVoando.style.transition = "all 1s";

    }

    function pad(pontuacao) {
        return (pontuacao < 10) ? ("0" + pontuacao) : pontuacao;
    }

    $scope.data = {
        score: pontuacao,
        round: rodada,
        shot: disparo
    };


});

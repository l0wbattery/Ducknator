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

    // VERIFICA DISPARO // -----------------------------------------------
    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
        if (acertou) eliminarPato(); //TODO +pontuacao por tipo de pato
    });

    // MOVIMENTA PATOS //-------------------------------------------------
    // $scope.$on('patos', function (event, posicoes) {
    //     foreach(pato in posicoes) {
    //         mudaAnguloDeVoo(pato.style.left, pato.style.top, pato.Posicoes.PosicaoX, pato.Posicoes.posicaoY, "pato");
    //         pato.style.top = pato.Posicoes.PosicaoY + "px";
    //         pato.style.left = pato.Posicoes.PosicaoX + "px";
    //         $scope.$apply();
    //     }
    // });




    // $scope.$on('pato2', function (event, posicaoPato2) {
    //
    //     mudaAnguloDeVoo(pato2.style.left, pato2.style.top, posicaoPato2.PosicaoX, posicaoPato2.posicaoY, "pato2");
    //
    //     pato2.style.top = posicaoPato2.PosicaoY + "px";
    //     pato2.style.left = posicaoPato2.PosicaoX + "px";
    // });


    function mudaAnguloDeVoo(posicaoXAnterior, posicaoYAnterior, novaPosicaoX, novaposicaoY, idPato) {
        let patoVoando = document.getElementById(idPato);
        patoVoando.style.transition = "all .0s";

        if ((Number(posicaoXAnterior.slice(0, posicaoXAnterior.length - 2))) < novaPosicaoX) {
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

    $scope.$on('sobeCachorro', function(index) {
      $scope.index = index;
    });

    $scope.$on('inicioRound', function(status){
      $scope.inicioRound = status;
    });
});

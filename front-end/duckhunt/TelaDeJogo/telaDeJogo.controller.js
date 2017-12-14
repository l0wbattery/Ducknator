angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 0000111;
    var rodada = 1;
    var disparo = 3;
    $scope.scoreIndividual = 0;
    $scope.roundAtual = 0;
    $scope.balas = new Array(6);
    var mira = document.getElementById("mira");

    var patos = [];
    //patinhos
    function resetPatinhos(){
        $scope.patinhoVermelho = new Array(0);
        $scope.patinhoBranco = new Array(10);
    }
    resetPatinhos();

    $scope.$on('patosMortos', function (event, patosMortos) {
        $scope.patinhoVermelho = new Array(patosMortos);
        $scope.patinhoBranco = new Array(patosBrancos - patosMortos);
        $scope.$apply();
    });

    //Inicializa o round no servidor
    $scope.rodaRound = function () {
        duckService.rodaRound(duckService.token);
        resetPatinhos();
        duckService.rodaRound();
    }
    //score individual
    $scope.$on('scoreIndividual', function (event, scoreIndividual) {
        $scope.scoreIndividual = scoreIndividual;
        $scope.$apply();
    });

    //round atual
    $scope.$on('roundAtual', function (event, roundAtual) {
        $scope.roundAtual = roundAtual;
        $scope.$apply();
    });

    //leaderBoard
    $scope.$on('leaderBoard', function (event, leaderBoard) {
        $scope.leaderBoard = leaderBoard;
        $scope.$apply();
    });

    // Recebe mensagens do servidor para a mira // -----------------------
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;

        $scope.mira = `
        left: ${$scope.miraX}px; 
        top: ${$scope.miraY}px;
        `;
        $scope.$apply();
    });

    // VERIFICA DISPARO // -----------------------------------------------
    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
        if (acertou) eliminarPato(); //TODO +pontuacao por tipo de pato
    });

    //MOVIMENTA PATOS //-------------------------------------------------
    $scope.$on('patos', function (event, listaDePatos) {
        let i;
        for (i = 0; i < listaDePatos.length; i++){      
            patos[i] = listaDePatos[i];
            movimentaPatos(patos[i]);
            console.log(patos[i]);
        }
        $scope.patos = patos;
        $scope.$apply();
    });
    
    function movimentaPatos(patoMovimentado){
        
    }

    // $scope.$on('pato2', function (event, posicaoPato2) {
    //
    //     mudaAnguloDeVoo(pato2.style.left, pato2.style.top, posicaoPato2.PosicaoX, posicaoPato2.posicaoY, "pato2");
    //
    //     pato2.style.top = posicaoPato2.PosicaoY + "px";
    //     pato2.style.left = posicaoPato2.PosicaoX + "px";
    // });

    /*function mudaAnguloDeVoo(posicaoXAnterior, posicaoYAnterior, novaPosicaoX, novaposicaoY, idPato) {
        let patoVoando = document.getElementById(idPato);
        patoVoando.style.transition = "all .0s";

        if ((Number(posicaoXAnterior.slice(0, posicaoXAnterior.length - 2))) < novaPosicaoX) {
            patoVoando.style.transform = "scaleX(1)";
        } else {
            patoVoando.style.transform = "scaleX(-1)";
        }

        patoVoando.style.transition = "all 1s";

    }
    }*/

    $scope.$on('sobeCachorro', function(index) {
      $scope.index = index;
    });

    $scope.$on('inicioRound', function(status){
      $scope.inicioRound = status;
    });
});

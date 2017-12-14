angular.module('duckHunt').controller('jogoController', function ($scope, duckService) {
    var pontuacao = 0000111;
    var rodada = 1;
    var disparo = 3;
    $scope.scoreIndividual = 0;
    $scope.roundAtual = 0;
    $scope.balas = new Array(6);
    $scope.patinhoVermelho = new Array(0);
    $scope.patinhoBranco = new Array(10);
    var patosBrancos = 10;
    var mira = document.getElementById("mira");

    var ultimaPosicaoDoPatoEmX = [500,500];
    var patos = [];


    $scope.$on('patosMortos', function (event, patosMortos) {
        $scope.patinhoVermelho = new Array(patosMortos);
        let aux = patosBrancos - patosMortos;
        $scope.patinhoBranco = new Array(aux);
        $scope.$apply();
    });

    //Inicializa o round no servidor
    $scope.rodaRound = function () {
        duckService.rodaRound(duckService.token);
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

    //numeração de cada round e chamada do proximo round
    $scope.$on('fimDeRound', function (event, nivel) {
        console.log(nivel+1);
        duckService.rodaRound(duckService.token);
    });

    // VERIFICA DISPARO // -----------------------------------------------
    $scope.$on('atirou', function (event, acertou, id) {
        patos[id].Vivo = false;
        $scope.patos[id].Vivo = false;

        console.log(acertou, id);
    });

    //MOVIMENTA PATOS //-------------------------------------------------
    $scope.$on('patos', function (event, listaDePatos) {
        if(!$scope.patos) {
            $scope.patos = listaDePatos
        }

        listaDePatos.forEach(function(pato, index) {
            if(pato.Vivo) {
                patos[index] = pato;
                inverteSpriteDosPatos(pato, ultimaPosicaoDoPatoEmX[index], listaDePatos[index].Posicoes.PosicaoX);
                ultimaPosicaoDoPatoEmX[index] = pato.Posicoes.PosicaoX;

                $scope.patos[index].Posicoes = pato.Posicoes;
            }
        })
    });

    function inverteSpriteDosPatos(pato, ultimaPosX, novaPosX) {
        if (ultimaPosX !== null) {
            if (ultimaPosX > novaPosX) {
                pato.Invertido = true;
            } else {
                pato.Invertido = false;
            }
        }
    }

    $scope.$on('sobeCachorro', function (event, qntdPatos) {
        $scope.qntdPatos = qntdPatos;
        
    });

    function resetaQuantidadePatos() {
        $scope.qntdPatos = null;
    }

    $scope.$on("acabouMiniRound", function() {
        $scope.patos = [];
    })

    $scope.$on('inicioRound', function (status) {
        $scope.inicioRound = status;
    });
});

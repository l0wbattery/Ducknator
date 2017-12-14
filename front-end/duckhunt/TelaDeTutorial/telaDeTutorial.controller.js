angular.module('duckHunt').controller('tutorialController', function ($scope, $location, duckService) {

    var redirecionarParaJogo = false;
    duckService.rodaTutorial(duckService.token);
    $scope.$on('redirectGame', function (event, redirectGame) {
        redirecionarParaJogo = redirectGame;
    });

    $scope.$on('criarPatoTutorial', function (event, patoTutorial) {
        $scope.patoTutorial = patoTutorial;
        $scope.patoTutorialStyle = `
            left: ${$scope.patoTutorial.Posicoes[0].PosicaoX}px;
            top: ${$scope.patoTutorial.Posicoes[0].PosicaoY}px;
            `;
        pato = document.getElementById("patoTutorial");
        pato.addEventListener("animationend", fimAnimacaoMorte);
        $scope.$apply();
    });

    fimAnimacaoMorte = function () {
        if (redirecionarParaJogo) {

            $location.path('/jogo');
            $scope.$apply();

        }
    }

    //Recebe mensagens do servidor
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

    //Inicia verificação de acerto do pato tutorial ao receber o sinal de tiro vindo do backend;
    $scope.$on('atirou', function (event, acertou,id) {
        if (acertou === true) {
            $scope.patoTutorial.Vivo = false;
        }
    });
});



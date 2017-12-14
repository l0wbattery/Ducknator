angular.module('duckHunt').controller('tutorialController', function ($scope, $location, duckService) {

    var redirectGame = false;
    var animationDone = false;

    $scope.$on('redirectGame', function (event, redirectGame) {
        this.redirectGame = redirectGame;
    });

    //Inicializa o round no servidor
    $scope.rodaRound = function () {
        duckService.rodaRound(duckService.token);
    }

    $scope.$on('token', function (event, token) {
        console.log(token);
        duckService.token = token;
        $scope.token = token;
        $scope.$apply();
    });

    $scope.$on('criarPatoTutorial', function (event, patoTutorial) {
        $scope.patoTutorial = patoTutorial;
        $scope.patoTutorialStyle = `
            left: ${$scope.patoTutorial.Posicoes[0].PosicaoX}px;
            top: ${$scope.patoTutorial.Posicoes[0].PosicaoY}px;
            `;
        pato = document.getElementById("patoTutorial");
        pato.addEventListener("animationend", fimAnimacaoMorte);

        console.log($scope.patoTutorialStyle);
        $scope.$apply();
    });

    fimAnimacaoMorte = function () {
        this.animationDone = true;
    }

    if (this.redirectGame && this.animationDone) {

        $location.path('/jogo');
        $scope.$apply();

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
    $scope.$on('atirou', function (event, acertou) {
        if (acertou === true) {
            $scope.patoTutorial.Vivo = false;
        }
    });
});



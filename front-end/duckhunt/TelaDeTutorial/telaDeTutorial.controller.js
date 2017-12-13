angular.module('duckHunt').controller('tutorialController', function ($scope, $location, duckService) {

    $scope.$on('redirectGame', function (event, redirectGame) {
        if (redirectGame) {
            $location.path('/jogo');
            $scope.$apply();
        }
    });

    $scope.$on('criarPatoTutorial', function (event, patoTutorial) {
        $scope.patoTutorial.Vivo = patoTutorial.Vivo;
    });

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;

        $scope.mira = "left:" + ($scope.miraX) + "px; top:" + ($scope.miraY) + "px;";
        $scope.$apply();
    });

    //Inicia verificação de acerto do pato tutorial ao receber o sinal de tiro vindo do backend;
    $scope.$on('atirou', function (event, acertou) {
        if (acertou === true) {
            $scope.patoTutorial.vivo = false;
        }
    });
});



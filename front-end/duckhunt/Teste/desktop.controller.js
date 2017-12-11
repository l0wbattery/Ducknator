angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;
    $scope.isPato1Vivo = true;
    $scope.isPato2Vivo = true;

    $scope.quadradoGamma = 300;
    $scope.quadradoAlpha = 300;
    $scope.stylewtf2 = "top:" + ($scope.quadradoGamma) + "px; left:" + ($scope.quadradoAlpha) + "px;";
    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.bolaGamma = gamma;
        $scope.bolaAlpha = alpha;
        
        $scope.stylewtf = "top:" + ($scope.bolaAlpha) + "px; left:" + ($scope.bolaGamma) + "px;";
        $scope.$apply();
    });

    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
    });

    $scope.$on('pato1', function (event, pato1) {
        console.log(pato1);
        $scope.stylewtf2 = "top:" + (pato1.PosicaoY) + "px; left:" + (pato1.PosicaoX) + "px;";
        $scope.$apply();
    });
    $scope.$on('pato2', function (event, pato2) {
        $scope.stylewtf3 = "top:" + (pato2.PosicaoY) + "px; left:" + (pato2.PosicaoX) + "px;";
        console.log(pato2);
        $scope.$apply();
    });

    $scope.rodaRound = function(){
        duckService.rodaPatosMiniRound();
    }

    $scope.$on('pato1vivo',function(event,morto1){
        $scope.isPato1Vivo = morto1;
        $scope.$apply();
    });

    $scope.$on('pato2vivo',function(event,morto2){
        $scope.isPato2Vivo = morto2;
        $scope.$apply();
    });

    $scope.$on('pontuacao',function(event,pontuacao){
        console.log(pontuacao);
    });
    
});


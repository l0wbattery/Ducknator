angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;

    $scope.quadradoGamma = 300;
    $scope.quadradoAlpha = 300;

    var posX = 100;
    var posY = 100;

    $scope.estiloQuadrado1 = "top:" + ($scope.quadradoGamma) + "px; left:" + ($scope.quadradoAlpha) + "px;";
    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.bolaGamma = gamma;
        $scope.bolaAlpha = alpha;

        
        
        $scope.mira = "top:" + ($scope.bolaAlpha) + "px; left:" + ($scope.bolaGamma) + "px;";
        $scope.$apply();
    });

    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
    });

    $scope.$on('pato1', function (event, pato1) {
        //console.log(pato1);
        $scope.estiloQuadrado1 = "top:" + (pato1.PosicaoY) + "px; left:" + (pato1.PosicaoX) + "px;";

        $scope.$apply();
    });
    $scope.$on('pato2', function (event, pato2) {
        $scope.estiloQuadrado2 = "top:" + (pato2.PosicaoY) + "px; left:" + (pato2.PosicaoX) + "px;";
        //console.log(pato2);
    });

    $scope.rodaRound = function(){
        duckService.rodaPatosMiniRound();
    }



    
});


angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;

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

    $scope.$on('patos', function (event, patos) {
        console.log(patos);
        $scope.patos = patos;
        $scope.$apply();
    });
    
    $scope.rodaRound = function(){
        duckService.rodaRound(duckService.token);
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


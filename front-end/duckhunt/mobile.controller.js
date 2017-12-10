angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    var bolaGamma;
    var bolaAlpha;
    let contador = 0;
    var patoY;
    var patoX;
    $scope.contador = contador;
    function handleMotionEvent(event) {
        
        bolaGamma = event.rotationRate.gamma;
        bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
        
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);

    
    $scope.$on('pato1', function (event, pato1) {
        patoY = pato1.PosicaoY;
        patoX = pato1.PosicaoX;
        $scope.stylewtf2 = "top:" + (pato1.PosicaoY) + "px; left:" + (pato1.PosicaoX) + "px;";
        $scope.$apply();
    });

    $scope.conta = function(){
        console.log('clicou');
        duckService.atirar(patoY,patoX);
    }
});


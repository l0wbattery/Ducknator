angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    var bolaGamma;
    var bolaAlpha;
    let contador = 0;
    $scope.contador = contador;
    function handleMotionEvent(event) {
        
        bolaGamma = event.rotationRate.gamma;
        bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
        
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);

    $scope.atirar = function(){
        scope.contador = contador+1;
        alert('teste');
        duckService.atirar(bolaGamma, bolaAlpha);
    }

    $scope.conta = function(){
        console.log('clicou');
        duckService.atirar(300,300);
    }
});


angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    var bolaGamma;
    var bolaAlpha;
    let contador = 0;
    var patoY;
    var patoX;
    var tiro = new Audio('../Audio/Winchester12.mp3');
    $scope.contador = contador;
    
    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') >= 0;
    
    function handleMotionEvent(event) {
        
        bolaGamma = event.rotationRate.gamma;
        bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha, duckService.token, isChrome);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);

    $scope.conta = function(){
        console.log('clicou');
        duckService.atirar(duckService.token);
        tiro.play();
    }
});


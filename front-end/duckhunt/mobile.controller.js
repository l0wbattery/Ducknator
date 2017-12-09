angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    var bolaGamma;
    var bolaAlpha;
    function handleMotionEvent(event) {
        
        bolaGamma = event.rotationRate.gamma;
        bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);

    $scope.atirar = function(){
        duckService.atirar(bolaGamma, bolaAlpha);
    }
});


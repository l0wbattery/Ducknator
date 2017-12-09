angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    
    duckService.connect();
    function handleMotionEvent(event) {
        
        var bolaGamma = event.rotationRate.gamma;
        var bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);
});


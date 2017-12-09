angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    duckService.connect();
    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;

    console.log("entrou controller");
    
    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha) {
        $scope.bolaGamma += gamma;
        $scope.bolaAlpha += alpha;
        $scope.stylewtf = "top:" + (-$scope.bolaAlpha) + "px; left:" + (-$scope.bolaGamma) + "px;";
        $scope.$apply();
    });

    function handleMotionEvent(event) {
        
        var bolaGamma = event.rotationRate.gamma;
        var bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);
});


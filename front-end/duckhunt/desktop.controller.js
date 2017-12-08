angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {

    duckService.connect();
    $scope.bolaGamma = 0;
    $scope.bolaAlpha = 0;

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha) {


        $scope.bolaGamma += Math.floor(gamma * 10);
        $scope.bolaAlpha += Math.floor(alpha * 10);

        if ($scope.bolaAlpha >= 400) $scope.bolaAlpha = 400;
        if ($scope.bolaAlpha <= 0) $scope.bolaAlpha = 0;
        if ($scope.bolaGamma >= 300) $scope.bolaGamma = 300;
        if ($scope.bolaGamma <= 0) $scope.bolaGamma = 0;

        $scope.stylewtf = "top:" + ($scope.bolaGamma) + "px; left:" + ($scope.bolaAlpha) + "px;";
        $scope.$apply();
    });

    function handleMotionEvent(event) {

        var bolaGamma = event.rotationRate.gamma;
        var bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);
});


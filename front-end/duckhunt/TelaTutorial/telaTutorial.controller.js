angular.module('duckHunt').controller('tutorialController', function ($scope, duckService) {

    $scope.miraX = -300;
    $scope.miraY = -300;

    $scope.patoX = 300;
    $scope.patoY = 300;

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;
        $scope.pato = "left:" + ($scope.patoX) + "px; top:" + ($scope.patoY) +"px;";
        $scope.mira = "left:" + ($scope.miraX) + "px; top:" + ($scope.miraY) + "px;";
        $scope.$apply();
    });

    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
        if(acertou){
            var patoMorto = document.getElementById("pato");
            
            patoMorto.style.animationPlayState = "paused";
            patoMorto.style.animationName = "pato-morrendo";
            patoMorto.style.animationFillMode = "forwards";
            patoMorto.style.animationIterationCount = "1";
            patoMorto.style.animationTimingFunction = "steps(1)";
            patoMorto.style.animationDuration = "1s";
            patoMorto.style.animationPlayState = "running";
        }
    });


});



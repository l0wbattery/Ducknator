angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    

    /*$scope.$on('messageAdded', function (event, remetente, destinatario, message) {
        var mensagem = { de: remetente, para: destinatario, mensagem: message };
        $scope.messages.push(mensagem);
        $scope.$apply();
    });
    
    $scope.sendMessage = function () {
        duckService.sendMessage($scope.remetente, $scope.destinatario, $scope.mensagem);
    };
    */
    duckService.connect();
    $scope.bolaGamma = 0;
    $scope.bolaAlpha = 0;


    
    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha) {
        
        $scope.bolaGamma += Math.floor(alpha*10);
        $scope.bolaAlpha += Math.floor(gamma*10);

        $scope.stylewtf = "margin-top:"+(-$scope.bolaGamma)+"px; margin-left:"+(-$scope.bolaAlpha)+"px;";
        console.log($scope.bolaGamma);
        console.log("-----------------------");
        console.log($scope.bolaAlpha);
        $scope.$apply();
    });

    function handleMotionEvent(event) {
        
        var bolaGamma = event.rotationRate.gamma;
        var bolaAlpha = event.rotationRate.alpha;

        duckService.sendMessage(bolaGamma, bolaAlpha);
    }

    window.addEventListener("devicemotion", handleMotionEvent, true);
});


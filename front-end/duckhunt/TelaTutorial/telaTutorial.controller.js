angular.module('duckHunt').controller('tutorialController', function ($scope, duckService) {

    $scope.miraX = -300;
    $scope.miraY = -300;

    $scope.patoX = -30;
    $scope.patoY = -30;

    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.miraX = gamma;
        $scope.miraY = alpha;
        $scope.pato = "top:" + ($scope.patoY) + "%;";
        $scope.mira = "left:" + ($scope.miraX) + "px; top:" + ($scope.miraY) + "px;";
        $scope.$apply();
    });

    $scope.$on('atirou', function (event, acertou) {
        console.log(acertou);
    });


});



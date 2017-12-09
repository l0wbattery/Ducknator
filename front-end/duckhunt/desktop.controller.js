angular.module('duckHunt').controller('desktopController', function ($scope, duckService) {
                
    $scope.bolaGamma = -300;
    $scope.bolaAlpha = -300;
    
    //Recebe mensagens do servidor
    $scope.$on('messageAdded', function (event, gamma, alpha, tiros) {
        $scope.tiros = tiros;
        $scope.bolaGamma += gamma;
        $scope.bolaAlpha += alpha;
        $scope.stylewtf = "top:" + (-$scope.bolaAlpha) + "px; left:" + (-$scope.bolaGamma) + "px;";
        $scope.$apply();
    });

    
});


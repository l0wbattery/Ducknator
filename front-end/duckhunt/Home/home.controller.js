angular.module('duckHunt').controller('homeController', function ($scope,duckService,$location) {

  $scope.$on('token',function(event,token){
    console.log(token);
    duckService.token = token;
    $scope.token = token;
    $scope.$apply();
  });

  var str = "12345.00";
  str = str.slice(0, -1);

  $scope.$on('isConnect',function(event,isConnect){
    if(isConnect){
      duckService.generateToken();
    }
  });
  $scope.$on('redirectNome',function(event,redirectNome){
    if(redirectNome){
      $location.path('/nick');
      $scope.$apply();
    }

  });
  $scope.ranking = function() {
    $location.path('/rankingTotal');
  }

  $scope.rankingDiario = function() {
    $location.path('/rankingPorDia');
  }

  $scope.rankingMensal = function() {
    $location.path('/rankingPorMes');
  }

});

angular.module('duckHunt').controller('tokenController', function ($scope,duckService,$location) {
  $scope.enviaToken = enviaToken;


  function enviaToken(){
    duckService.token = $scope.token;
    console.log('teste');
    duckService.enviaToken($scope.token);
  }
  $scope.$on('redirectMobile',function(event,redirectMobile){
    if(redirectMobile){
      $location.path('/mobile');
      $scope.$apply();
    }
  });

});

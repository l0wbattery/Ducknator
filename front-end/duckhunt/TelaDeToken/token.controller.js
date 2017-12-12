angular.module('duckHunt').controller('tokenController', function ($scope,duckService,$location) {

  $scope.enviarToken = function(){
    duckService.token = $scope.token;
    console.log('teste');
    duckService.enviaToken($scope.token);
  }
  $scope.$on('redirectMobile',function(event,redirectMobile){
    if(redirectMobile){
      $location.path('/mobile');
    }
  }); 
  
});

angular.module('duckHunt').controller('nickController', function ($scope,duckService,$location) {
  
  $scope.enviarNick = function(){
    duckService.enviaNick($scope.nick,duckService.token);
  }

  $scope.$on('redirectGame',function(event,redirectGame){
    if(redirectGame){
      $location.path('/jogo');
      $scope.$apply();
    }
    
  }); 
});

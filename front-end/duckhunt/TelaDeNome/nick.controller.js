angular.module('duckHunt').controller('nickController', function ($scope,duckService,$location) {
  
  $scope.enviarNick = function(){
    duckService.enviaNick($scope.nick,duckService.token);
  }

  $scope.$on('redirectTutorial',function(event,redirectTutorial){
    if(redirectTutorial){
      $location.path('/tutorial');
      $scope.$apply();
    }
  }); 
});

angular.module('duckHunt').controller('homeController', function ($scope,duckService) {

  $scope.$on('token',function(event,token){
    console.log(token);
    duckService.token = token;
    $scope.token = token;
    $scope.$apply();
  });

  $scope.$on('isConnect',function(event,isConnect){
    if(isConnect){
      duckService.generateToken();
    }
  }); 

});

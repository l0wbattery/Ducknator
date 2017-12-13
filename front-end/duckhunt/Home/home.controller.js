angular.module('duckHunt').controller('homeController', function ($scope,duckService,$location) {

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
  $scope.$on('redirectNome',function(event,redirectNome){
    if(redirectNome){
      $location.path('/nick');
      $scope.$apply();
    }

  });

});

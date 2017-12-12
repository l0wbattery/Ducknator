angular.module('duckHunt').controller('homeController', function ($scope,duckService) {

  

  $scope.$on('token',function(event,token){
    console.log('teste on');
    $scope.token = token;
    $scope.$apply();
  });

  duckService.generateToken();

});

angular.module('duckHunt').controller('homeController', function ($scope,duckService) {

  duckService.generateToken();

  $scope.$on('token',function(event,token){
    console.log('teste on');
    $scope.token = token;
    $scope.$apply();
  });

});

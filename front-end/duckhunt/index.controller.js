angular.module('app').controller('IndexController',function($scope,authService){
    $scope.auth = authService;
    $scope.logout = authService.logout;
});

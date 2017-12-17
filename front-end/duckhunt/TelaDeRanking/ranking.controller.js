angular.module('duckHunt').controller('rankingController', function($scope, $location){

    $scope.voltar = function() {
      $location.path('/ducknator');
      location.reload();
    }
})

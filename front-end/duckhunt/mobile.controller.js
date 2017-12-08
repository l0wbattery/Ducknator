angular.module('duckHunt').controller('mobileController', function ($scope, duckService) {
    
    duckService.connect();
    
});


angular
    .module('duckHunt', ['ngRoute'])
    .value('$', $)
    .run(function(duckService) {
        duckService.connect();
    })
;
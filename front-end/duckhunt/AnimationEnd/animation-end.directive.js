angular.module("duckHunt")
    .directive("animationEnd", function() {
        return {
            restrict: "A",
            scope: {
                animationEnd: "="
            },
            link: function(scope, element) {
                var $element = element[0];

                $element.addEventListener("animationend", scope.animationEnd);
            }
        }
    })
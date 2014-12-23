/*
 This directive allows us to pass a function in on an enter key to do what we want.
 Thanks: http://ericsaupe.com/angularjs-detect-enter-key-ngenter/
 */
angular.module('io.risu.goldbin.components')
    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

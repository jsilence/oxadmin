angular.module('io.risu.thinbin.components')
    .directive('confirmedClick', function ($parse, $q, $compile, $rootScope) {

        return {
            link: function (scope, element, attrs) {

                var fn = $parse(attrs.confirmedClick);

                element.on('click', function () {

                    if (confirm('Wirklich?') === true) {
                        fn(scope, {$event: event});
                    }

                });
            }

        };
    });
angular.module('io.risu.thinbin.components')
    .filter('shorten', function () {
        return function (input, maxLength) {
            var output = input;

            if (input.length > maxLength) {
                output = input.substring(0, maxLength) + '(...)';
            }

            return output;
        };
    });

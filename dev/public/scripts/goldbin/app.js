(function () {

    try {
        // try to get inline templates
        angular.module('templates');
    } catch (err) {
        // on error, dummy create templates module
        angular.module('templates', []);
    }

    var app = angular.module('io.risu.goldbin', [
        'ngRoute',

        'io.risu.goldbin.components',
        'io.risu.goldbin.landing',

        'templates'
    ]);

})();

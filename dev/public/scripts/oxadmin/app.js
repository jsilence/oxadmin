(function () {

    try {
        // try to get inline templates
        angular.module('templates');
    } catch (err) {
        // on error, dummy create templates module
        angular.module('templates', []);
    }

    var app = angular.module('oxadmin', [
        'ngRoute',

        'oxadmin.components',
        'oxadmin.core',
        'oxadmin.landing',

        'templates'
    ]);

})();

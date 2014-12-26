(function () {

    try {
        // try to get inline templates
        angular.module('templates');
    } catch (err) {
        // on error, dummy create templates module
        angular.module('templates', []);
    }

    var app = angular.module('io.risu.thinbin', [
        'ngRoute',
        'ngClipboard',
        'angularFileUpload',
        'restangular',
        'monospaced.qrcode',

        'io.risu.thinbin.components',
        'io.risu.thinbin.core',
        'io.risu.thinbin.landing',
        'io.risu.thinbin.upload',

        'templates'
    ]);

})();

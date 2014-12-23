angular.module('io.risu.goldbin')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/upload', {
                templateUrl: 'scripts/goldbin/upload/src/views/controllers/uploadView.html',
                controller: 'UploadController'
            })
            .otherwise({
                redirectTo: '/upload'
            });
    }]);
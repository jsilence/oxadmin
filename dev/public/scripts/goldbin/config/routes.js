angular.module('io.risu.goldbin')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/start', {
                templateUrl: 'scripts/goldbin/landing/src/views/controllers/landingView.html',
                controller: 'LandingController'
            })
            .when('/upload/:method', {
                templateUrl: 'scripts/goldbin/upload/src/views/controllers/uploadView.html',
                controller: 'UploadController'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }]);
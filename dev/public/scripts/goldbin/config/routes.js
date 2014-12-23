angular.module('io.risu.goldbin')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/start', {
                templateUrl: 'scripts/goldbin/landing/src/views/controllers/landingView.html',
                controller: 'landingController'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }]);
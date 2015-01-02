angular.module('oxadmin')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/start', {
                templateUrl: 'scripts/oxadmin/landing/src/views/controllers/landingView.html',
                controller: 'LandingController'
            })
            .otherwise({
                redirectTo: '/start'
            });
    }]);

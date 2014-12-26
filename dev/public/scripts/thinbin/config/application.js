angular.module('io.risu.thinbin')
    .config(['SettingServiceProvider', 'RestangularProvider', function (SettingServiceProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    }]);

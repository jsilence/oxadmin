angular.module('io.risu.goldbin.upload')
    .factory('UploadService',
    ['$http', 'SettingService', function ($http, SettingService) {

        var _retentions = SettingService.get('retentions'),
            _displayModes = SettingService.get('displayModes');

        function getTranslatedRetentions() {
            return angular.copy(_retentions);
        }

        function getTranslatedDisplayModes() {
            return angular.copy(_displayModes);
        }

        return {
            getTranslatedRetentions: getTranslatedRetentions,
            getTranslatedDisplayModes: getTranslatedDisplayModes
        };
    }]);
angular.module('io.risu.thinbin.upload')
    .factory('UploadService',
    ['$http', 'SettingService', 'FileService', function ($http, SettingService, FileService) {

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
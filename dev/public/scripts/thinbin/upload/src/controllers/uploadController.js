angular.module('io.risu.thinbin.upload')
    .controller('UploadController',
    ['$scope', 'UploadService',
        function ($scope, UploadService) {

            $scope.retentions = UploadService.getTranslatedRetentions();
            $scope.displayModes = UploadService.getTranslatedDisplayModes();
        }
    ]);
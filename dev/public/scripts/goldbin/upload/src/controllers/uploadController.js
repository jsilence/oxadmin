angular.module('io.risu.goldbin.upload')
    .controller('UploadController',
    ['$scope', 'UploadService',
        function ($scope, UploadService) {

            $scope.retentions = UploadService.getTranslatedRetentions();
            $scope.displayModes = UploadService.getTranslatedDisplayModes();
        }
    ]);
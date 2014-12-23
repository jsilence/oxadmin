angular.module('io.risu.goldbin.landing')
    .controller('LandingController',
    ['$scope', 'SettingsService',
        function ($scope, SettingsService) {

            $scope.allowedPlaintextMimes = SettingsService.get('allowedPlaintextMimes').join(',');
            $scope.allowedBinaryMimes    = SettingsService.get('allowedBinaryMimes').join(',');

            console.log($scope.allowedPlaintextMimes, $scope.allowedBinaryMimes);

            $scope.onUpload = function(method, files) {
                console.log('upload', method);

                if(angular.isArray(files)) {
                    console.log('with file', files);
                } else {
                    console.log('no files');
                }
            };
        }
    ]);
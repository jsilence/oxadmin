angular.module('io.risu.thinbin.landing')
    .controller('LandingController',
    ['$scope', '$location', 'SettingService',
        function ($scope, $location, SettingService) {

            $scope.allowedPlaintextMimes = SettingService.get('allowedPlaintextMimes').join(',');
            $scope.allowedBinaryMimes    = SettingService.get('allowedBinaryMimes').join(',');

            console.log($scope.allowedPlaintextMimes, $scope.allowedBinaryMimes);

            $scope.onUpload = function(method, files) {
                console.log('uploadddd', method);

                var targetPath = ['/upload'];

                method = ['binary', 'plaintext'].indexOf(method) > -1 ? method : 'plaintext';
                targetPath.push(method);

                if(angular.isArray(files)) {
                    console.log('with file', files);
                } else {
                    console.log('no files');
                }

                targetPath = targetPath.join('/');
                console.log('goto', targetPath);

                $location.path(targetPath);
            };
        }
    ]);
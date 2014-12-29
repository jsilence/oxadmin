angular.module('io.risu.thinbin.upload')
    .controller('UploadController',
    ['$scope', '$routeParams', '$location', '$timeout', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, $timeout, UploadService, FileService) {

            $scope.isProcessing = false;

            $scope.displayModes = UploadService.getTranslatedDisplayModes();
            $scope.defaultMode  = $scope.displayModes['_plaintext'];

            $scope.retentions = UploadService.getTranslatedRetentions();
            var shortestRetention = Object.keys($scope.retentions)
                .reduce(function (prevKey, currKey) {
                    var prev = $scope.retentions[prevKey],
                        curr = $scope.retentions[currKey];

                    return prev < curr ? prevKey : currKey;
                });

            $scope.defaultRetention = $scope.retentions['_24_hours'];

            $scope.onFormSubmit = function onSubmitClick() {
                $scope.isProcessing = true;
                FileService.savePlaintextFile($scope.uploadForm.plaintext)
                    .then(onSuccess, onError);

                function onSuccess(response) {
                    var url = ['/upload', response.id , 'done'].join('/');
                    $location.path(url);
                }

                function onError(response) {
                    var error = response.data;
                    $scope.errorMessage = error.message;
                    $scope.isProcessing = false;

                    $timeout(function () {
                        $scope.errorMessage = undefined;
                    }, 5000);
                }

            };
        }
    ]);
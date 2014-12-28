angular.module('io.risu.thinbin.upload')
    .controller('UploadController',
    ['$scope', '$routeParams', '$location', '$timeout', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, $timeout, UploadService, FileService) {

            $scope.isProcessing = false;
            $scope.retentions = UploadService.getTranslatedRetentions();
            $scope.displayModes = UploadService.getTranslatedDisplayModes();

            $scope.onFormSubmit = function onSubmitClick() {
                $scope.isProcessing = true;
                FileService.savePlaintextFile($scope.uploadForm.plaintext)
                    .then(onSuccess, onError);

                    function onSuccess(response) {
                        var url = ['/upload',response.id , 'done'].join('/');
                        $location.path(url);
                    }

                    function onError(response) {
                        var error = response.data;
                        $scope.errorMessage = error.message;
                        $scope.isProcessing = false;

                        $timeout(function() {
                            $scope.errorMessage = undefined;
                        }, 5000);
                    }

            };
        }
    ]);
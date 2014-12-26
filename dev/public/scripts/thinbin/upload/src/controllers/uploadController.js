angular.module('io.risu.thinbin.upload')
    .controller('UploadController',
    ['$scope', '$routeParams', '$location', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, UploadService, FileService) {

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

                    function onError() {
                        $scope.isProcessing = false;
                    }

            };
        }
    ]);
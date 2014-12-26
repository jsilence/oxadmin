angular.module('io.risu.thinbin.upload')
    .controller('UploadDoneController',
    ['$scope', '$routeParams', '$location', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, UploadService, FileService) {

            FileService
                .readPlaintextFileById($routeParams.id)
                .then(function (file) {
                    $scope.viewUrl = file.viewFileUrl;
                    $scope.downloadUrl = file.downloadFileUrl;
                });
        }
    ]);
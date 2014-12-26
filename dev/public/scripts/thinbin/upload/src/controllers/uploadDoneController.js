angular.module('io.risu.thinbin.upload')
    .controller('UploadDoneController',
    ['$scope', '$routeParams', '$location', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, UploadService, FileService) {

            FileService
                .readPlaintextFileById($routeParams.id)
                .then(function (file) {
                    $scope.viewUrl = '/api/file/' + file.id;
                    $scope.downloadUrl = '/api/file/' + file.id + '/raw';
                });
        }
    ]);
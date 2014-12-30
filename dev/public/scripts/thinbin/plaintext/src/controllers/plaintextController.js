angular.module('io.risu.thinbin.plaintext')
    .controller('PlaintextController',
    ['$scope', '$routeParams', '$http', 'UploadService', 'FileService',
        function ($scope, $routeParams, $http, UploadService, FileService) {

            FileService
                .readPlaintextFileById($routeParams.id)
                .then(function (file) {
                    console.log('I READ', file.downloadFileUrl);
                    $scope.file = file;
                    $scope.file.expiresAt = moment($scope.file.expiresAt).calendar();

                    $http.get(file.downloadFileUrl).then(function(response) {
                        console.log('RESPONSE WAS', response);

                        $scope.source = response.data;
                    })
                });
        }
    ]);
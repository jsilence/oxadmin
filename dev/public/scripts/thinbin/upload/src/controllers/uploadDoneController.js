angular.module('io.risu.thinbin.upload')
    .controller('UploadDoneController',
    ['$scope', '$routeParams', '$location', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, UploadService, FileService) {

            $scope.qrCodeType = 'Thinbin Url';
            $scope.qrCodeData = undefined;

            FileService
                .readPlaintextFileById($routeParams.id)
                .then(function (file) {
                    $scope.file = file;
                    $scope.file.expiresAt = moment($scope.file.expiresAt).calendar();
                });

            $scope.showQrCode = function showQrCode(type, data) {
                $scope.qrCodeType = type;
                $scope.qrCodeData = data;
            };

            $scope.hideQrCode = function hideQrCode() {
                $scope.qrCodeData = undefined;
            };
        }
    ]);
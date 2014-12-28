angular.module('io.risu.thinbin.upload')
    .controller('UploadDoneController',
    ['$scope', '$routeParams', '$location', 'UploadService', 'FileService',
        function ($scope, $routeParams, $location, UploadService, FileService) {

            $scope.qrCodeType = 'Thinbin Url';
            $scope.qrCodeData = true;

            FileService
                .readPlaintextFileById($routeParams.id)
                .then(function (file) {
                    $scope.viewUrl = file.viewFileUrl;
                    $scope.downloadUrl = file.downloadFileUrl;
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
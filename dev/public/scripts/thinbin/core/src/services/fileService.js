angular.module('io.risu.thinbin.core')
    .factory('FileService', ['Restangular', function (Restangular) {

        function savePlaintextFile(filedata) {
            return Restangular
                    .service('file')
                    .post(filedata);
        }

        function readPlaintextFileById(fileId) {
            return Restangular
                        .one('file', fileId)
                        .get();
        }

        return {
            savePlaintextFile: savePlaintextFile,
            readPlaintextFileById: readPlaintextFileById
        }
    }]);

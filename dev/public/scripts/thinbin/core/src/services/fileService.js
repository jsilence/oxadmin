angular.module('io.risu.thinbin.core')
    .factory('FileService', ['SettingService', 'Restangular', function (SettingService, Restangular) {

        // helpers

        function decorateFile(file) {
            var apiUrl = SettingService.get('apiUrl');

            file.viewFileUrl = apiUrl + '/file/' + file.id;
            file.downloadFileUrl = apiUrl + '/file/' + file.id + '/raw';

            return file;
        }

        // public api functions

        function savePlaintextFile(filedata) {
            return Restangular
                    .service('file')
                    .post(filedata)
                    .then(decorateFile);
        }

        function readPlaintextFileById(fileId) {
            return Restangular
                        .one('file', fileId)
                        .get()
                        .then(decorateFile);
        }

        return {
            savePlaintextFile: savePlaintextFile,
            readPlaintextFileById: readPlaintextFileById
        }
    }]);

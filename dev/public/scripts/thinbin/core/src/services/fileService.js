angular.module('io.risu.thinbin.core')
    .factory('FileService', ['$location', 'SettingService', 'Restangular', function ($location, SettingService, Restangular) {

        // helpers

        function decorateFile(file) {
            var apiUrl = SettingService.get('apiUrl');

            var appUrl = [
                $location.protocol(),
                '://',
                $location.host(),
                $location.port() ? ':' + $location.port() : '',
                '/'
            ].join('');

            file.viewFileUrl = appUrl + '#/plaintext/' + file.id;
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

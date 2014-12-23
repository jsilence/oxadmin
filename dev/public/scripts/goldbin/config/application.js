angular.module('io.risu.goldbin')
    .config(['SettingsServiceProvider', function (SettingsServiceProvider) {

        SettingsServiceProvider.set({
            allowedPlaintextMimes: [
                'text/plain',
                '*/*'
            ],
            allowedBinaryMimes: [
                '*/*'
            ]
        });

    }]);

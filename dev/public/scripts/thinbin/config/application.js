angular.module('io.risu.thinbin')
    .config(['SettingServiceProvider', function (SettingServiceProvider) {

        // configure accepted mimetypes
        SettingServiceProvider.set({
            allowedPlaintextMimes: [
                'text/plain',
                '*/*'
            ],
            allowedBinaryMimes: [
                '*/*'
            ]
        });

        // configure maximum retention period
        // @TODO: fetch this from server please
        SettingServiceProvider.set({
            retentions: {
                '_30_minutes': (30 * 60 * 1000),
                '_60_minutes': (60 * 60 * 1000),
                '_12_hours':   (12 * 60 * 60 * 1000),
                '_24_hours':   (24 * 60 * 60 * 1000),
                '_1_week':     (7 * 24 * 60 * 60 * 1000),
                '_1_month':    (31 * 24 * 60 * 60 * 1000),
                '_3_months': (3 * 31 * 24 * 60 * 60 * 1000),
                '_6_months': (6 * 31 * 24 * 60 * 60 * 1000),
                '_1_year': (12 * 31 * 24 * 60 * 60 * 1000)
            }
        });

        // configure display modes for plaintext files
        // @TODO: fetch this from server please
        SettingServiceProvider.set({
            displayModes: {
                '_plain_text': '_plain_text',
                '_javascript': '_javascript',
                '_html': '_html',
                '_css': '_css',
                '_sql': '_sql',
                '_bash': '_plain_text',
                '_c': '_c'
            }
        });

    }]);

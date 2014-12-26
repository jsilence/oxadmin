angular.module('io.risu.thinbin.core')
    .provider('SettingService', [function () {

        var _settings = {};

        this.set = function set() {
            if (typeof arguments[0] === 'object') {

                var settings = arguments[0];
                Object.keys(settings).forEach(function (key) {
                    _settings[key] = settings[key];
                });

            } else {

                var key = arguments[0];
                var value = arguments[1];
                _settings[key] = value;
            }
        };

        var q = jQuery.ajax({
            type: 'GET',
            url: '/api/config',
            cache: false,
            async: false,
            contentType: 'application/json',
            dataType: 'json'
        });

        if (q.status === 200) {
            this.set(angular.fromJson(q.responseText));
        }

        this.$get = [
            function () {
                function get(key) {
                    return angular.copy(_settings[key]);
                }

                return {
                    isReady: function () {
                        return _isReady;
                    },
                    get: get
                }
            }
        ]
    }]);

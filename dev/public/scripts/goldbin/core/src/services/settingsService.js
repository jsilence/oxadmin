angular.module('io.risu.goldbin.core')
    .provider('SettingsService', function () {

        var _settings = {};

        this.set = function set() {
            if(typeof arguments[0] === 'object') {

                var settings = arguments[0];
                Object.keys(settings).forEach(function(key){
                    _settings[key] = settings[key];
                });

            } else {

                var key   = arguments[0];
                var value = arguments[1];
                _settings[key] = value;
            }
        };

        this.$get = [
            function() {
                function get(key) {
                    return angular.copy(_settings[key]);
                }

                return {
                    get: get
                }
            }
        ]
    });

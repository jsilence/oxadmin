'use strict';

// imports

var Q = require('q'),
    path = require('path'),
    confit = require('confit');

// module wide variables

var configDir = path.join(__dirname, '/../../config');

// exported functions

function createConfig() {
    var deferred = Q.defer(),
        options = {
            basedir: configDir
        };

    confit(options)
        .addDefault('production.json')
        .addOverride('development.json')
        .create(function (err, conf) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(conf);
            }
        });

    return deferred.promise;
}

// on module loading

console.log('Reading configs from: ', configDir);

module.exports = {
    create: createConfig
};
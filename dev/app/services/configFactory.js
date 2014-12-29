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
        confitLoader,
        options = {
            basedir: configDir
        };

    confitLoader = confit(options).addDefault('production.json');

    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'development') {
        console.log('Running in development');
        confitLoader = confitLoader.addOverride('development.json');
    }

    confitLoader.create(function (err, conf) {
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
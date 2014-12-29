'use strict';

// imports

var Hapi = require('hapi'),
    ConfigFactory = require(__dirname + '/app/services/configFactory.js'),
    FileService = require(__dirname + '/app/services/fileService.js');

// Application Start

var server = new Hapi.Server();

ConfigFactory
    .create()
    .then(startApplication, showError);

function startApplication(config) {

    var hostname = config.get('hostname'),
        port     = config.get('port');

    console.log('hostname: \t', hostname);
    console.log('port: \t\t', port);


    server.connection({
        host: hostname,
        port: port
    });

    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });

// register api routes
    console.log('Registering routes');

    server.register({
        register: require('hapi-router').register,
        options: {
            routesDir: (__dirname + '/app/routes/')
        }
    }, function (err) {
        if (err) throw err;
    });

// serve static contents
    console.log('Registering public folder');

    startDeletionWorker(config);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: (__dirname + '/public'),
                listing: true
            }
        }
    });

}

function startDeletionWorker(config) {
    // @TODO find a better solution for deleting uploaded files

    var retentions = config.get('shared').retentions,
        smallest;

    smallest = Object.keys(retentions)
        .map(function(key) { return retentions[key]; })
        .reduce(function(prev, curr) {return prev < curr ? prev : curr; });

    setInterval(function() {
        FileService.deleteAllExpiredFiles().then(function() {
            console.log('Cleaned expired files');
        });
    }, smallest);

    console.log('Started expired file worker');
}


function showError(err) {
    console.log('Service could not start because of the following error', err);
}
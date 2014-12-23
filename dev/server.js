'use strict';

// imports

var Hapi = require('hapi');

// Application Start

var server = new Hapi.Server();
server.connection({ port: 8001 });

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

// serve static contents

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

// register api routes

server.register({
    register: require('hapi-router').register,
    options: {
        routesDir: (__dirname + '/app/routes/')
    }
}, function (err) {
    if (err) throw err;
});


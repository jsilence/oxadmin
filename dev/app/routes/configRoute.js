'use strict';

// imports

var Boom = require('boom'),
    ConfigFactory = require('../services/configFactory.js');

// route handlers

function handleGetConfig(request, reply) {
    ConfigFactory
        .create()
        .then(function(config) {
            reply(config.get('shared'));
        });
}

// exported api

module.exports = [
    {
        path: '/api/config',
        method: 'GET',
        handler: handleGetConfig
    }
];
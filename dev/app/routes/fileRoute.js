'use strict';

// imports

var Boom = require('boom'),
    FileService = require('../services/fileService.js');

// route handlers

function handleGetFile(request, reply) {
    reply({file:'jojo'});
}

// exported api

module.exports = [
    {
        path: '/api/file/{id}',
        method: 'GET',
        handler: handleGetFile
    }
];
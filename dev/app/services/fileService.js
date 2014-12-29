'use strict';

// imports

var PouchDB = require('pouchdb'),
    Q = require('q'),
    atob = require('atob'),
    btoa = require('btoa'),
    generateId = require('../utils/generateId')(),
    ConfigFactory = require('../services/configFactory'),
    settings;

// module instances

var pouch,
    settings;

ConfigFactory
    .create()
    .then(function(config) {
        settings = config;
        pouch = PouchDB(config.pouchStorePath);
    });

// private helpers

function convertDocumentToMetafile(doc) {

    var meta,
        files = {};

    Object.keys(doc._attachments).forEach(function (key) {
        var attachment = doc._attachments[key],
            fileName = key;

        files[fileName] = {
            contentType: attachment['content_type'],
            length: attachment['length']
        };
    });

    meta = {
        id: doc._id,
        files: files,
        expiresAt: (doc.expiresAt || null)
    };

    return meta;
}

function validateFileRequirements(filedata) {
    var error,
        sharedSettings = settings.get('shared'),
        validRetentions = sharedSettings.retentions;

    validRetentions = Object.keys(validRetentions)
                            .map(function(key) { return validRetentions[key]; });

    if(!error && filedata.content === undefined) {
        error = 'Content is not defined.';
    }
    if(!error && filedata.content.length > sharedSettings.maxFileSizeBytes) {
        error = 'Provided content exceeds upload filsize limit.';
    }
    if(!filedata.retentionPeriod) {
        error = 'Retention period is missing.';
    }
    if(!error && validRetentions.indexOf(filedata.retentionPeriod) == -1) {
        error = 'Given retention period is not available.';
    }
    if(!error && isNaN(filedata.retentionPeriod)) {
        error = 'Given retention period is not valid.';
    }

    return error;
}

// service functions

function saveFileById(fileId, filedata) {

    filedata.retentionPeriod = Number(filedata.retentionPeriod);

    var files,
        deferred = Q.defer(),
        validationError = validateFileRequirements(filedata);

    if(validationError) {
        deferred.reject(validationError);
    } else {
        files = {};
        files[fileId] = {
            content_type: 'plain/text',
            data: btoa(filedata.content),
        };

        pouch.put({
            _id: fileId,
            _attachments: files,
            expiresAt: (filedata.retentionPeriod + Date.now())
        }).then(function (doc) {
            deferred.resolve(readFile(fileId));
        }).catch(function (err) {
            console.log('ERROR:', err);
            deferred.resolve(err);
        });
    }

    return deferred.promise;
}

function saveFile(fileData) {
    var fileId = generateId();

    return pouch
        .get(fileId)
        .then(onIdFound, onIdFree);

    function onIdFound() {
        // try once again
        return saveFile(fileData);
    }

    function onIdFree() {
        return saveFileById(fileId, fileData);
    }
}

function readFile(fileId) {
    var fileName = String(fileId);

    return pouch.get(fileId)
        .then(function (doc) {
            return convertDocumentToMetafile(doc);
        }).catch(function (err) {
            console.log('ERROR:', err);
        });
}

function readRawFile(fileId) {
    var fileName = String(fileId);

    return pouch.getAttachment(fileId, fileName)
        .then(function (blob) {
            return atob(blob);
        }).catch(function (err) {
            console.log('ERROR:', err);
        });
}

// exported api

module.exports = {
    saveFile: saveFile,
    readFile: readFile,
    readRawFile: readRawFile
};
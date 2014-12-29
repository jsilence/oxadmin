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
    .then(function (config) {
        settings = config;
        console.log('Using Pouch with: ', config.get('pouchStore'));

        pouch = PouchDB(config.get('pouchStore'));
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
        .map(function (key) {
            return validRetentions[key];
        });

    if (!error && filedata.content === undefined) {
        error = 'Content is not defined.';
    }
    if (!error && filedata.content.length > sharedSettings.maxFileSizeBytes) {
        error = 'Provided content exceeds upload filsize limit.';
    }
    if (!error && isNaN(filedata.retentionPeriod)) {
        error = 'Given retention period is not valid.';
    }
    if (!filedata.retentionPeriod) {
        error = 'Retention period is missing.';
    }
    if (!error && validRetentions.indexOf(filedata.retentionPeriod) == -1) {
        error = 'Given retention period is not available.';
    }

    return error;
}

function isFileExpired(file) {
    return (!doc.expiresAt) || (doc.expiresAt <= Date.now());
}

// service functions

function saveFileById(fileId, filedata) {

    filedata.retentionPeriod = Number(filedata.retentionPeriod);

    var files,
        deferred = Q.defer(),
        validationError = validateFileRequirements(filedata);

    if (validationError) {
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

    return pouch.get(fileName)
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

function readExpiredFilesMeta() {
    var deferred = Q.defer();

    function map(doc) {
        if (!doc.expiresAt || doc.expiresAt <= Date.now()) {
            emit(doc._id);
        }
    }

    return pouch.query({map: map}, {reduce: false}, function (err, response) {
        if (err) {
            deferred.resolve(err);
        } else {
            deferred.resolve(response);
        }
    });
}

function deleteFileById(fileId) {
    return pouch.get(fileId)
        .then(function (doc) {
            return pouch.remove(doc)
                .then(function(f) {
                    return doc;
                }).catch(function(err) {
                    console.log('File deletion failed', err);
                });
        }).catch(function (err) {
            console.log('ERROR:', err);
        });
}

function deleteAllExpiredFiles() {
    return readExpiredFilesMeta()
        .then(function (result) {
            var promises = result.rows.map(function (meta) {
                return deleteFileById(meta.key);
            });

            return Q.all(promises).then(function(deletedDocs) {
                return deletedDocs.map(convertDocumentToMetafile);
            });
        }).catch(function (err) {
            console.log('ERROR:', err);
        });
}


// exported api

module.exports = {
    saveFile: saveFile,
    readFile: readFile,
    readRawFile: readRawFile,
    deleteFile: deleteFileById,
    readExpiredFilesMeta: readExpiredFilesMeta,
    deleteAllExpiredFiles: deleteAllExpiredFiles,
};
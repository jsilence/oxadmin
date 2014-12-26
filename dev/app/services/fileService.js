'use strict';

// imports

var PouchDB = require('pouchdb'),
    Q = require('q'),
    atob = require('atob'),
    btoa = require('btoa');

// module instances

var pouch = PouchDB('/tmp/thinbin');

// private helpers

function convertDocumentToMetafile(doc) {

    var meta,
        files = {};

    Object.keys(doc._attachments).forEach(function(key) {
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
        expiresAt: (doc.expiresAt || null),
    };

    return meta;
}

// service functions

function saveFile(filedata) {
    var fileId,
        files;

    fileId = String(Date.now());
    files = {};
    files[fileId] = {
        content_type: 'plain/text',
        data: btoa(filedata.content)
    };

    return pouch.put({
        _id: fileId,
        _attachments: files
    }).then(function (doc) {
        return readFile(fileId);
    }).catch(function (err) {
        console.log('ERROR:', err);
    });
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
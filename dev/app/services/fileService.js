'use strict';

// service functions

function readFile(user) {
    return {
        id: user.id,
        realname: user.realname,
        email: user.email,
        avatarUrl: user.getAvatarUrl(),
        interests: user.interests
    };
}

// exported api

module.exports = {
    readFile: readFile
}
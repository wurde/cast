'use strict'

/**
 * Dependencies
 */

const crypto = require('crypto');

/**
 * Define helper
 */

function sha256(data) {
    const hash = crypto.createHash('sha256');

    hash.write(data);

    return hash.digest('hex');
}

/**
 * Export helper
 */

module.exports = sha256;
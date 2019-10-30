'use strict'

/**
 * Dependencies
 */

const url = require("url");
const printError = require('./printError');

/**
 * Define helper
 */

function parseUrl(target) {
    let targetURL = url.parse(target)
    if (!targetURL.protocol) targetURL = url.parse('https://' + target)
    if (!targetURL.hostname) printError('Error: Invalid URL')
    return targetURL
}

/**
 * Export helper
 */

module.exports = parseUrl
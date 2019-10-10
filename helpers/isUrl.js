'use strict'

/**
 * Dependencies
 */

const url = require("url")

/**
 * Define helper
 */

function isUrl(url) {
    const result = url.parse(url)

    return result.hostname ? true : false
}

/**
 * Export helper
 */

module.exports = isUrl
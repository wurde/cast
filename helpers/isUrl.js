'use strict'

/**
 * Dependencies
 */

const url = require("url")

/**
 * Define helper
 */

function isUrl(rootUrl) {
    const result = url.parse(rootUrl)

    console.log(result)
    return result.hostname ? true : false
}

/**
 * Export helper
 */

module.exports = isUrl
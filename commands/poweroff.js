'use strict'

/**
 * Dependencies
 */

const shutdown = require('./shutdown')

/**
 * Define script
 */

function poweroff() {
  shutdown(['--poweroff', 'now'])
}

/**
 * Export script
 */

module.exports = poweroff

'use strict'

/**
 * Dependencies
 */

const shutdown = require('./shutdown')

/**
 * Define script
 */

function reboot() {
  shutdown(['--reboot'])
}

/**
 * Export script
 */

module.exports = reboot

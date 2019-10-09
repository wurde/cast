'use strict'

/**
 * Dependencies
 */

const shutdown = require('./shutdown')

/**
 * Define script
 */

function restart() {
  shutdown(['--reboot'])
}

/**
 * Export script
 */

module.exports = restart

'use strict'

/**
 * Dependencies
 */

const shutdown = require('./shutdown')

/**
 * Define script
 */

function restart() {
  shutdown(['--reboot', 'now'])
}

/**
 * Export script
 */

module.exports = restart

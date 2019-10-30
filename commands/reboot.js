'use strict'

/**
 * Dependencies
 */

const shutdown = require('./shutdown')

/**
 * Define script
 */

function reboot() {
  shutdown(['--reboot', 'now'])
}

/**
 * Export script
 */

module.exports = reboot

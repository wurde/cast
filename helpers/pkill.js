/**
 * Dependencies
 */

const child_process = require('child_process');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasPkill = which('pkill');

/**
 * Define helper
 */

function pkill(args) {
  if (hasPkill) {
    const { status } = child_process.spawnSync('pkill', args);
    return status;
  } else {
    return -1;
  }
}

/**
 * Export helper
 */

module.exports = pkill;

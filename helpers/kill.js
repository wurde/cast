/**
 * Dependencies
 */

const child_process = require('child_process');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasKill = which('kill');

/**
 * Define helper
 */

function kill(pid, signal = '-SIGTERM') {
  if (hasKill) {
    const { status } = child_process.spawnSync('kill', [signal, pid]);
    return status;
  } else {
    return -1;
  }
}

/**
 * Export helper
 */

module.exports = kill;

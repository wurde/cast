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
  if (hasKill) child_process.spawnSync('kill', [signal, pid]);
}

/**
 * Export helper
 */

module.exports = kill;

/**
 * Dependencies
 */

const child_process = require('child_process');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasPidof = which('pidof');

/**
 * Define helper
 */

function pidof(bin) {
  try {
    if (!hasPidof) return [];

    const pids = child_process.execSync(`pidof ${bin}`, { encoding: 'utf8' }).trim();
    return pids.split(' ').map(e => parseInt(e));
  } catch (e) {
    return [];
  }
}

/**
 * Export helper
 */

module.exports = pidof;

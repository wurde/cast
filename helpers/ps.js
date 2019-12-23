/**
 * Dependencies
 */

const child_process = require('child_process');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasPs = which('ps');

/**
 * Define helper
 */

function ps(pid) {
  try {
    if (!hasPs) return 1;

    const p = child_process.execSync(`ps ${pid}`, { encoding: 'utf8' }).trim();
    return p ? 0 : 1;
  } catch (e) {
    return e.status;
  }
}

/**
 * Export helper
 */

module.exports = ps;

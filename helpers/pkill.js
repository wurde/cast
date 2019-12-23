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
    // const { status } = child_process.spawnSync('pkill', args);
    console.log('args', args)
    const { status, stdout, stderr } = child_process.spawnSync('pkill', args, {
      encoding: 'utf8',
      stdio: [null, 'inherit', 'inherit']
    });
    console.log('status', status);
    console.log('stdout', stdout);
    console.log('stderr', stderr);
    return status;
  } else {
    return -1;
  }
}

/**
 * Export helper
 */

module.exports = pkill;

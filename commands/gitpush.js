'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit']
}

/**
 * Define script
 */

function gitpush() {
  child_process.spawnSync('git', ['push'], config)
}

/**
 * Export script
 */

module.exports = (argv) => {
  gitpush()
}

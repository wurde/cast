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

function gitsync() {
  child_process.spawnSync('git', ['add', '-A'], config)
  child_process.spawnSync('git', ['commit', '-m', 'gitsync cleanup commit'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', 'master'], config)
  child_process.spawnSync('git', ['merge', 'annex'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', '-B', 'annex'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', 'master'], config)
  child_process.spawnSync('git', ['pull', 'origin', 'master'], config)
  child_process.spawnSync('git', ['push', 'origin', 'master'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', '-B', 'annex'], config)
}

/**
 * Export script
 */

module.exports = (argv) => {
  gitsync()
}

'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  encoding: 'utf8',
  stdio: [null, 'pipe', 'inherit']
}

/**
 * Helpers
 */

const master_or_main = (output) => {
  const branches = output.split('\n').map(x => x.replace('* ', '').trim())

  for (let i = 0; i < branches.length; i++) {
    if (branches[i] === 'main') return 'main';
    if (branches[i] === 'master') return 'master';
  }
  return 'master'
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast gitsync
`, {
  description: 'Complex update of remote refs.'
})

/**
 * Define script
 */

function gitsync() {
  showHelp(cli)

  const result = child_process.spawnSync('git', ['branch', '--list'], config)
  const branch_name = master_or_main(result.output[1])

  child_process.spawnSync('git', ['add', '-A'], config)
  child_process.spawnSync('git', ['commit', '-m', 'gitsync cleanup commit'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', branch_name], config)
  child_process.spawnSync('git', ['merge', 'annex'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', '-B', 'annex'], config)
  child_process.spawnSync('git', ['checkout', '--quiet', branch_name], config)
  child_process.spawnSync('git', ['pull', 'origin', branch_name], config)
  child_process.spawnSync('git', ['push', 'origin', branch_name], config)
  child_process.spawnSync('git', ['checkout', '--quiet', '-B', 'annex'], config)
}

/**
 * Export script
 */

module.exports = gitsync

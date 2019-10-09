'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const child_process = require('child_process')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit']
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast shutdown
`, {
  description: 'Shut down the system.'
})

/**
 * Define script
 */

function shutdown() {
  showHelp(cli)

  child_process.spawnSync('shutdown', ['--help'], config)
  console.log('shutdown')
}

/**
 * Export script
 */

module.exports = shutdown

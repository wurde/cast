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
  stdio: [null, 'inherit', 'inherit'],
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast shutdown [OPTIONS] [TIME]

  Options
    -H --halt      Halt the machine
    -P --poweroff  Power-off the machine
    -r --reboot    Reboot the machine
    -k             Don't halt/power-off/reboot, just send warnings
    -c             Cancel a pending shutdown
`, {
  description: 'Shut down the system.'
})

/**
 * Define script
 */

function shutdown() {
  showHelp(cli)

  child_process.spawnSync('shutdown', process.argv.splice(3), config)
}

/**
 * Export script
 */

module.exports = shutdown

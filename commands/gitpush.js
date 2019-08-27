'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process')
const meow = require('meow')

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
    $ cast gitpush
`)

/**
 * Define script
 */

function gitpush() {
  if (cli.flags.h) cli.showHelp()
  child_process.spawnSync('git', ['push'], config)
}

/**
 * Export script
 */

module.exports = (argv) => {
  gitpush()
}

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
  showHelp(cli)
  child_process.spawnSync('git', ['push'], config)
}

/**
 * Export script
 */

module.exports = gitpush

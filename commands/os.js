'use strict'

/**
 * Dependencies
 */

const os = require('os')
const meow = require('meow')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast os
`)

/**
 * Define script
 */

function os_script() {
  if (cli.flags.h) cli.showHelp()
}

/**
 * Export script
 */

module.exports = os_script

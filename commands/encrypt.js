'use strict'

/**
 * Dependencies
 */

const meow = require('meow')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast encrypt
`)

/**
 * Define script
 */

function encrypt() {
  if (cli.flags.h) cli.showHelp()
}

/**
 * Export script
 */

module.exports = encrypt

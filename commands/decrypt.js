'use strict'

/**
 * Dependencies
 */

const crypto = require('crypto')
const meow = require('meow')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast decrypt
`)

/**
 * Define script
 */

function decrypt() {
  if (cli.flags.h) cli.showHelp()
}

/**
 * Export script
 */

module.exports = decrypt

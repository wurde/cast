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
    $ cast compress
`)

/**
 * Define script
 */

function compress() {
  if (cli.flags.h) cli.showHelp()
  console.log('Compress')
}

/**
 * Export script
 */

module.exports = compress

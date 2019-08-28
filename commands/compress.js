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
    $ cast compress FILE

  Options
    --unzip       Decompress file (Default: false).
`, {
  flags: {
    unzip: {
      type: 'boolean',
      default: false
    }
  }
})

/**
 * Define script
 */

function compress() {
  if (cli.flags.h) cli.showHelp()

  console.log(cli.flags)
  console.log('Compress')
}

/**
 * Export script
 */

module.exports = compress

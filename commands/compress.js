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
    $ cast compress FILE...

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
  if (!cli.input.length < 2) cli.showHelp()

  if (cli.flags.unzip) {
    console.log('Uncompress', cli.input)
  } else {
    console.log('Compress', cli.input)
  }
}

/**
 * Export script
 */

module.exports = compress

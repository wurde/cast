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
    $ cast pdf [options] files(s)

  Options
    --watch, -w  Automatically re-render when changes are detected (Default: false).
`, {
  flags: {
    watch: {
      type: 'boolean',
      alias: 'w'
    }
  }
})

/**
 * Define script
 */

function pdf(argv) {
  if (cli.flags.h) cli.showHelp()

  console.log('PDF')
}

/**
 * Export script
 */

module.exports = pdf

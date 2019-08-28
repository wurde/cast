'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const zlib = require('zlib')
const meow = require('meow')

/**
 * Constants
 */

const gzip = zlib.createGzip()

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
  if (cli.input.length < 2) cli.showHelp()

  let files = cli.input.slice(1, cli.input.length)
  files = files.filter(file => fs.existsSync(file))
  if (files.length < 1) cli.showHelp()

  if (cli.flags.unzip) {
    for (let i = 0; i < files.length; i++) {
      console.log('Uncompress', files[i])
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      console.log('Compress', files[i])
    }
  }
}

/**
 * Export script
 */

module.exports = compress

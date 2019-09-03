'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const gunzip = zlib.createGunzip()
const gzip = zlib.createGzip()

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast compress FILE...

  Options
    --unzip     Decompress file (Default: false).
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
  showHelp(cli, [cli.flags.h, cli.input.length < 2])

  let files = cli.input.slice(1, cli.input.length)
  files = files.filter(file => fs.existsSync(file))
  if (files.length < 1) cli.showHelp()

  if (cli.flags.unzip) {
    for (let i = 0; i < files.length; i++) {
      const filename = path.basename(files[i], path.extname(files[i]))
      const fileIn = fs.createReadStream(files[i])
      const fileOut = fs.createWriteStream(filename)

      fileIn.pipe(gunzip).pipe(fileOut)
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      const fileIn = fs.createReadStream(files[i])
      const fileOut = fs.createWriteStream(`${files[i]}.gz`)

      fileIn.pipe(gzip).pipe(fileOut)
    }
  }
}

/**
 * Export script
 */

module.exports = compress

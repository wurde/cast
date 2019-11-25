'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const zlib = require('zlib')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

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
`, {
  description: 'Compress files into a ZIP archive.'
})

/**
 * Define script
 */

function compress() {
  showHelp(cli, [cli.input.length < 2])

  let files = cli.input.slice(1).filter(file => fs.existsSync(file))
  if (files.length < 1) cli.showHelp()

  for (let i = 0; i < files.length; i++) {
    const fileIn = fs.createReadStream(files[i])
    const fileOut = fs.createWriteStream(`${files[i]}.gz`)

    fileIn.pipe(gzip).pipe(fileOut)
  }
}

/**
 * Export script
 */

module.exports = compress

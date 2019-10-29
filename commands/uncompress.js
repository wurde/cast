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

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast uncompress FILE...
`, {
  description: 'Extract compressed files in a ZIP archive.'
})

/**
 * Define script
 */

function uncompress() {
  showHelp(cli, [cli.input.length < 2])

  let files = cli.input.slice(1, cli.input.length)
  files = files.filter(file => fs.existsSync(file))
  if (files.length < 1) cli.showHelp()

  for (let i = 0; i < files.length; i++) {
    const filename = path.basename(files[i], path.extname(files[i]))
    const fileIn = fs.createReadStream(files[i])
    const fileOut = fs.createWriteStream(filename)

    fileIn.pipe(gunzip).pipe(fileOut)
  }
}

/**
 * Export script
 */

module.exports = uncompress

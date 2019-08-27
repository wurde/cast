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
  if (cli.input.length < 2) cli.showHelp()

  const message = cli.input.slice(1, cli.input.length).join(' ')

  console.log(`\nEncrypting: '${message}'`)
}

/**
 * Export script
 */

module.exports = encrypt

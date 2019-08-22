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
    $ cast qotd
`)

/**
 * Define script
 */

async function qotd() {
  if (cli.flags.h) cli.showHelp()

  console.log('Quote of the day')
}

/**
 * Export script
 */

module.exports = qotd

'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const figlet = require('figlet')

/**
 * Constants
 */

const API_URL = 'https://en.wikiquote.org/w/api.php'

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

  figlet.text('Quote of the day', (err, data) => {
    console.log(data)
  })
}

/**
 * Export script
 */

module.exports = qotd

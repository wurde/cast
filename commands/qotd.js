'use strict'

/**
 * Dependencies
 */

const https = require('https')
const meow = require('meow')
const figlet = require('figlet')

/**
 * Constants
 */

const API_URL = 'https://en.wikiquote.org/w/api.php'
const AUTHORS = [
  'Albert Einstein',
  'Walt Disney',
  'Steve Jobs'
]

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

  https.get(API_URL, res => {
    console.log('statusCode:', res.statusCode)

    figlet.text('Quote of the day', (err, data) => {
      console.log(data)
    })
  })
}

/**
 * Export script
 */

module.exports = qotd

'use strict'

/**
 * Dependencies
 */

const https = require('https')
const querystring = require('querystring')
const meow = require('meow')
const figlet = require('figlet')

/**
 * Constants
 */

const API_URL = 'https://en.wikiquote.org/w/api.php'
const AUTHORS = [
  'Albert Einstein',
  'Steve Jobs',
  'Walt Disney',
]

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast qotd
`)

/**
 * Define helper
 */

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Define script
 */

async function qotd() {
  if (cli.flags.h) cli.showHelp()

  https.get(`${API_URL}?${querystring.stringify({
    format: 'json',
    action: 'query',
    redirects: '',
    titles: AUTHORS[randomInteger(0, AUTHORS.length - 1)]
  })}`, res => {
    let data = ''

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      data = JSON.parse(data)
      const pages = data.query.pages

      console.log('end', pages)

      figlet.text('Quote of the day', (err, data) => {
        console.log(data)
      })
    })
  })
}

/**
 * Export script
 */

module.exports = qotd

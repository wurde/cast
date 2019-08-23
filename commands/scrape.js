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
    $ cast scrape [options] <selector> <url>

  Options
    --url, -u   Automatically re-render when changes are detected.
    --selector, -s   Automatically re-render when changes are detected.
`, {
  flags: {
    url: {
      type: 'text',
      alias: 'u'
    },
    selector: {
      type: 'text',
      alias: 's'
    },
  }
})

/**
 * Define script
 */

async function scrape() {
  if (cli.flags.h) cli.showHelp()

  console.log('Scrape')
}

/**
 * Export script
 */

module.exports = scrape

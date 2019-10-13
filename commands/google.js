'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google QUERY
`, {
  description: 'Query Google for a list of results.',
})

/**
 * Define script
 */

async function google() {
  showHelp(cli)

  const query = cli.input.slice(1).join(' ')

  const results = await scrape({
    url: `https://www.google.com/search?q=${query}`,
    selector: 'div.g'
  })
  
  console.log(results, results.length)
  // TODO map and parse {title, href, description}
}

/**
 * Export script
 */

module.exports = google

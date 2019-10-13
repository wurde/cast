'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')
const cheerio = require('cheerio')

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

  const scrapeResults = await scrape({
    url: `https://www.google.com/search?q=${query}`,
    selector: 'div.g'
  })

  const formattedResults = scrapeResults
    .map(formatResults)
    .filter(hasTitleandValidLink)

  if (arguments.length === 0) {
    console.log(formattedResults)
  }

  return formattedResults
}

function hasTitleandValidLink(packagedResult)  {
  const prefixedWithHttp = packagedResult.href.split('').slice(0,4).join('') === 'http'
  return packagedResult.title && prefixedWithHttp
}

function formatResults(result) {
  const $ = cheerio.load(result)

  return {
    title: $('h3').text(),
    href: $('a').first()[0].attribs.href,
    description: $('span.st').text()
  }
}

/**
 * Export script
 */

module.exports = google

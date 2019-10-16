'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')
const cheerio = require('cheerio')
const chalk = require('chalk')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google QUERY

  Options:
    --count, -c   Set limit on results. (Default: 10)
`, {
  description: 'Query Google for a list of results.',
  flags: {
    count: {
      type: 'string',
      alias: 'c'
    }
  }
})

/**
 * Define helpers
 */

// cb for [].prototype.filter
function hasTitleandValidLink(packagedResult) {
  const prefixedWithHttp = packagedResult.href.startsWith('http')
  return packagedResult.title && prefixedWithHttp
}

// cb for [].prototype.map
function formatResults(result) {
  const $ = cheerio.load(result)

  return {
    title: $('h3').text(),
    href: $('a').first()[0].attribs.href,
    description: $('span.st').text()
  }
}

function formatValidResults(scrapedResults) {
  return scrapedResults
    .map(formatResults)
    .filter(hasTitleandValidLink)
}

function printResults(results) {
  results.forEach(result => {
    console.log(chalk.green.bold(result.title))
    console.log(chalk.yellow.bold(result.href))
    console.log(result.description)
    console.log('')
  })
}

/**
 * Define script
 */

async function google(options={}) {
  showHelp(cli, [!options])

  const query = options.query || cli.input.slice(1).join(' ')
  const limit = options.count || cli.flags.count || 10
  
  const scrapeResults = async (query='', start=0) => await scrape({
    url: `https://www.google.com/search?q=${query}&start=${start}`,
    selector: 'div.g'
  })

  let results = []
  let remaining = limit
  let counter = 0
  while (remaining > 0) {
    const scrapedResults = await scrapeResults(query, counter)
    results = results.concat(formatValidResults(scrapedResults))
    counter += scrapedResults.length
    remaining -= scrapedResults.length

    // trim off leftover results
    if (remaining < 0) {
      results = results.slice(0, counter + remaining)
    }
  }

  if (arguments.length === 0) {
    printResults(results)
  }

  return results
}

/**
 * Export script
 */

module.exports = google

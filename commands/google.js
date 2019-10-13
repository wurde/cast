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
`, {
  description: 'Query Google for a list of results.',
})

/**
 * Define helpers
 */

// cb for [].prototype.filter
function hasTitleandValidLink(packagedResult) {
  const prefixedWithHttp = packagedResult.href.split('').slice(0, 4).join('') === 'http'
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
    printResults(formattedResults)
  }

  return formattedResults
}

/**
 * Export script
 */

module.exports = google

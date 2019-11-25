'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const scrape = require('./scrape');
const cheerio = require('cheerio');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');

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

function hasTitleandValidLink(result) {
  return result.title && result.href.startsWith('http');
}

function formatResults(result) {
  const $ = cheerio.load(result);

  return {
    title: $('h3').text(),
    href: $('a').first()[0].attribs.href,
    description: $('span.st').text()
  }
}

function formatValidResults(scrapedResults) {
  return scrapedResults
    .slice(0, scrapedResults.length)
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

async function google(query=null, limit=null) {
  showHelp(cli, [(!query && cli.input.length < 2)]);

  query = query ? query : cli.input.slice(1).join(' ');
  label = query;
  limit = limit || cli.flags.count || 10;

  const browser = await launchBrowser({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  });

  const scrapeResults = async (query='', start=0) => await scrape(
    `https://www.google.com/search?q=${query}&start=${start}`,
    'div.g',
    browser
  )

  let results = [];
  let remaining = limit;
  let counter = 0;

  try {
    while (remaining > 0) {
      const scrapedResults = await scrapeResults(query, counter);
      results = results.concat(formatValidResults(scrapedResults));
      counter += scrapedResults.length;
      remaining -= scrapedResults.length;

      // trim off leftover results
      if (remaining < 0) {
        results = results.slice(0, counter + remaining);
      }
    }

    if (arguments.length === 0) {
      if (limit < 20) {
        printResults(results);
      } else {
        console.log(JSON.stringify(results))
      }
    }
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    browser.close();
    return results;
  }
}

/**
 * Export script
 */

module.exports = google

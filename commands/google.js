'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const cheerio = require('cheerio');
const Sequelize = require('sequelize');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');
const Database = require('../helpers/Database');

/**
 * Constants
 */

const DB_PATH = path.join(process.env.HOME, '.google.sqlite3');
const QUERIES = {
  insertResult: () => `
    INSERT OR IGNORE INTO results (query, href, title, description) VALUES ($1, $2, $3, $4);
  `,
  createTablesQueries: () => `
    CREATE TABLE IF NOT EXISTS results (
      id integer PRIMARY KEY,
      query text,
      href text UNIQUE,
      title text,
      description text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
  `
};

/**
 * Define helpers
 */

async function saveResults(db, query, results) {
  try {
    for (let i = 0; i < results.length; i++) {
      await db.exec('insertResult', null, {
        bind: [
          query,
          results[i].href,
          results[i].title,
          (results[i].description || ''),
      ]});
    }
  } catch (e) {
    console.error(e);
  }
}

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
  console.log('')
  results.forEach(result => {
    console.log('  ' + chalk.green.bold(result.title))
    console.log('  ' + chalk.yellow.bold(result.href))
    console.log('')
  })
}

/**
 * Define script
 */

async function google(query = null, options={}) {
  showHelp(cli, [(!query && cli.input.length < 2)]);

  query = query || cli.input.slice(1).join(' ');
  const limit = options.limit || cli.flags.count || 10;

  const db = new Database(DB_PATH, QUERIES);
  await db.exec('createTablesQueries');

  const browser = await launchBrowser({
    headless: false,
    delay: 400,
    timeout: 0,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  });

  const scrapeResults = async (query='', start=0) => await scrape(
    `https://www.google.com/search?q=${query}&start=${start}`, {
      selector: 'div.g',
      browser
    }
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

    await saveResults(db, query, results);
  } catch (err) {
    console.error(err); return err;
  } finally {
    browser.close();
    return results;
  }
}

/**
 * Export script
 */

module.exports = google

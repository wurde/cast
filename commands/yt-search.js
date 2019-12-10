'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const cheerio = require('cheerio');
const scrape = require('./scrape');
const Database = require('../helpers/Database');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Constants
 */

const YT_URL = 'https://www.youtube.com';
const DB_PATH = path.join(process.env.HOME, '.youtube.sqlite3');
const QUERIES = {
  insertSearchResult: () => `
    INSERT OR IGNORE INTO search_results (
      query, youtube_id, title, description
    ) VALUES ($1, $2, $3, $4);
  `,
  createTables: () => `
    CREATE TABLE IF NOT EXISTS search_results (
      id integer PRIMARY KEY,
      query text,
      youtube_id text UNIQUE,
      title text,
      description text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
  `
};

/**
 * Define helpers
 */

function printResults(results) {
  console.log('');
  results.forEach(result => {
    console.log('  ' + chalk.white.bold(result.title));
    console.log('  ' + chalk.green.bold(`${YT_URL}/watch?v=${result.youtube_id}`));
    console.log('  ' + chalk.yellow.bold(result.description));
    console.log('');
  });
}

async function saveResults(db, query, results) {
  try {
    for (let i = 0; i < results.length; i++) {
      await db.exec('insertSearchResult', null, {
        bind: [
          query,
          results[i].youtube_id,
          results[i].title,
          results[i].description || ''
        ]
      });
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
    $ cast yt-search QUERY
  
  Options:
    -c, --count    Minimum number of results (default 10).
`, {
  description: 'Search videos on YouTube.',
  flags: {
    count:  {
      type: 'integer',
      alias: 'c',
      default: 10
    },
  }
});

/**
 * Define script
 */

async function yt_search(query = null, options = {}) {
  showHelp(cli, [(!query && cli.input.length < 2)]);

  query = query || cli.input.slice(1).join(' ');
  const count = options.count || cli.flags.count;

  const db = new Database(DB_PATH, QUERIES);
  await db.exec('createTables');

  const browser = await launchBrowser({
    headless: false,
    delay: 400,
    timeout: 0,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  });

  let results = [];

  try {
    let targetUrl = `${YT_URL}/results?search_query=${encodeURIComponent(
      query
    )}`;

    const result = await scrape(targetUrl, {
      selector: '#contents ytd-video-renderer',
      infiniteScroll: true,
      minCount: count,
      browser
    });
    browser.close();

    results = result.map(html => {
      const $ = cheerio.load(html);
      return {
        youtube_id: $('a#video-title')[0].attribs.href.match(/\?v=(.*)?/)[0].replace('?v=', ''),
        title: $('a#video-title')[0].attribs.title,
        description: $('#description-text').text(),
        query
      };
    });

    if (arguments.length === 0) {
      if (count < 20) {
        printResults(results);
      } else {
        console.log(JSON.stringify(results));
      }
    }

    await saveResults(db, query, results);
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    browser.close();
    return results;
  };
}

/**
 * Export script
 */

module.exports = yt_search;

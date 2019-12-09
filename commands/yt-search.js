'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast yt-search QUERY
`, {
  description: 'Search videos on YouTube.'
});

/**
 * Define script
 */

async function yt_search(query = null) {
  showHelp(cli, [(!query && cli.input.length < 2)]);

  query = query || cli.input.slice(1).join(' ');

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
    console.log('query', query);
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

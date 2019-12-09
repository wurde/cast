'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Constants
 */

const YT_URL = 'https://www.youtube.com/results';

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
    let targetUrl = `${YT_URL}?search_query=${encodeURIComponent(query)}`;

    // const result = await scrape(targetUrl, {
    //   selector: 'div#search img',
    //   infiniteScroll: true,
    //   minCount,
    //   browser
    // });

    console.log('targetUrl', targetUrl);
    // console.log('result', result);
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

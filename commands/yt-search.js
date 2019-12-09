'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const cheerio = require('cheerio');
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

    const result = await scrape(targetUrl, {
      selector: '#contents ytd-video-renderer',
      infiniteScroll: true,
      count,
      browser
    });

    results = result.map(html => {
      const $ = cheerio.load(html);
      return {
        youtube_id: $('a#video-title')[0].attribs.href,
        title: $('a#video-title')[0].attribs.title,
        description: $('#description-text').text(),
        channel_name: $('#channel-name').text().trim(),
        query
      };
    });

    console.log('results', results);
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

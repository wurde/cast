'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const prompts = require('prompts');
const { requireConnectivity } = require('../helpers/connectivity');
const parseUrl = require('../helpers/parseUrl');
const showHelp = require('../helpers/showHelp');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape URL [OPTIONS]

  Options
    --selector, -s PATTERN   CSS selector to filter page content.
    --count, -c NUMBER       How many selector matches to return.
    --infinite-scroll        Scroll down the page for more content.
`, {
  description: 'Scrape web content.',
  flags: {
    selector: {
      type: 'text',
      alias: 's'
    },
    count: {
      type: 'integer',
      alias: 'c'
    },
    infiniteScroll: {
      type: 'boolean'
    }
  }
})

/**
 * Define script
 */

async function scrape(url=null, options) {
  showHelp(cli, [(!url && cli.input.length < 2)]);
  requireConnectivity();

  url = url || cli.input[1];
  const selector = options.selector || cli.flags.selector;
  const count = options.count || cli.flags.count;
  const infiniteScroll = options.infiniteScroll || cli.flags.infiniteScroll;
  const browser = options.browser || await launchBrowser({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  });

  const parsedUrl = parseUrl(url).href;
  const page = await browser.newPage();
  await page.goto(parsedUrl);

  let results = []
  try {
    if (typeof selector === 'function') {
      results = await page.evaluate(selector);
    } else {
      results = await page.evaluate(selector => {
        const elements = Array.from(document.querySelectorAll(selector))
          .map(el => el.outerHTML)
          
        return elements
      }, selector)
    }

    if (arguments.length === 0) console.log(JSON.stringify(results))
  } catch(err) {
    console.error(err)
    return err
  } finally {
    options.browser ? page.close() : browser.close();
    return results
  }
}

/**
 * Export script
 */

module.exports = scrape

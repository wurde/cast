'use strict';

/**
 * Dependencies
 */

const meow = require('meow');
const prompts = require('prompts');
const { requireConnectivity } = require('../helpers/connectivity');
const parseUrl = require('../helpers/parseUrl');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');
const launchBrowser = require('../helpers/launchBrowser');
const handleCaptcha = require('../helpers/handleCaptcha');

/**
 * Define helpers
 */

async function parsePage(page, selector) {
  if (typeof selector === 'function') {
    return await page.evaluate(selector);
  } else if (typeof selector === 'string') {
    return await page.evaluate(selector => {
      return Array.from(document.querySelectorAll(selector)).map(
        el => el.outerHTML
      );
    }, selector);
  } else {
    return await page.content();
  }
};

async function scrollToPageBottom(page) {
  try {
    // Get current scrollHeight.
    const currentScrollHeight = await page.evaluate(() => {
      return document.querySelector('html').scrollHeight
    });

    // Scroll to the bottom of the page.
    await page.evaluate(() => {
      window.scrollTo(0, document.querySelector('html').scrollHeight)
    });

    // Wait for scroll height to increase.
    await page.waitForFunction(
      `document.querySelector('html').scrollHeight > ${currentScrollHeight}`,
      { timeout: 10000 }
    );

    // Wait for 2 seconds.
    await page.waitFor(2000);

    // Get current scrollHeight.
    const totalScrollHeight = await page.evaluate(() => {
      return document.querySelector('html').scrollHeight;
    });

    // Return true if page is still scrollable.
    return totalScrollHeight > currentScrollHeight;
  } catch (err) {
    return false;
  }
};

async function checkResultCount(page, selector, minCount) {
  const result = await parsePage(page, selector);
  const resultCount = result.length;
  return resultCount < minCount;
}

/**
 * Parse args
 */

const cli = meow(
  `
  Usage
    $ cast scrape URL [OPTIONS]

  Options
    --selector, -s PATTERN   CSS selector to filter page content.
    --min-count, -c NUMBER   Minimum number of selector matches to return.
    --infinite-scroll        Scroll down the page for more content.
`,
  {
    description: 'Scrape web content.',
    flags: {
      selector: {
        type: 'text',
        alias: 's'
      },
      minCount: {
        type: 'integer',
        alias: 'c'
      },
      infiniteScroll: {
        type: 'boolean'
      }
    }
  }
);

/**
 * Define script
 */

async function scrape(url = null, options = {}) {
  showHelp(cli, [!url && cli.input.length < 2]);
  requireConnectivity();

  url = url || cli.input[1];
  const selector = options.selector || cli.flags.selector;
  const minCount = options.minCount || cli.flags.minCount;
  const infiniteScroll = options.infiniteScroll || cli.flags.infiniteScroll;
  const browser =
    options.browser ||
    (await launchBrowser({
      headless: false,
      defaultViewport: {
        width: 1024,
        height: 800
      }
    }));

  const page = await browser.newPage();
  await page.goto(parseUrl(url).href);

  await handleCaptcha(page)

  let results;
  try {
    if (infiniteScroll) {
      let isScrolling = true;

      while (isScrolling) {
        isScrolling = await scrollToPageBottom(page);
        if (minCount) {
          isScrolling = await checkResultCount(page, selector, minCount);
        }
      }
    }

    results = await parsePage(page, selector);
    if (arguments.length === 0) console.log(JSON.stringify(results));
  } catch (err) {
    console.error(err);
    return err;
  } finally {
    options.browser ? page.close() : browser.close();
    return results;
  }
}

/**
 * Export script
 */

module.exports = scrape;

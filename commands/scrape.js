'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const prompts = require('prompts')
const { requireConnectivity } = require('../helpers/connectivity')
const parseUrl = require('../helpers/parseUrl')
const showHelp = require('../helpers/showHelp')
const launchBrowser = require('../helpers/launchBrowser')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape URL

  Options
    --selector, -s PATTERN   Define the CSS selector.
`, {
  description: 'Scrape web content.',
  flags: {
    selector: {
      type: 'text',
      alias: 's'
    }
  }
})

/**
 * Define script
 */

async function scrape(url=null, selector=null, browser=null) {
  showHelp(cli, [((!url || !selector) && cli.input.length < 2)]);
  requireConnectivity();

  url = url ? url : cli.input[1];
  selector = selector ? selector : cli.flags.selector;

  if (!selector) {
    console.log('')
    const selectorPrompt = await prompts(
      {
        type: 'text',
        name: 'value',
        message: 'Enter a CSS selector',
        validate: value => (value.length === 0 ? 'Minimum 1 character' : true)
      },
      {
        onCancel: () => {
          process.exit(1);
        }
      }
    );
    selector = selectorPrompt.value;
  }

  const parsedUrl = parseUrl(url).href;

  let keepBrowserAlive;
  if (!browser) {
    keepBrowserAlive = false;
    browser = await launchBrowser({
      headless: true,
      defaultViewport: {
        width: 1024,
        height: 800
      }
    });
  } else {
    keepBrowserAlive = true;
  }

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

    if (arguments.length === 0) {
      console.log(JSON.stringify(results))
    }
  } catch(err) {
    console.error(err)
    return err
  } finally {
    if (keepBrowserAlive) {
      page.close();
    } else {
      browser.close();
    }
    return results
  }
}

/**
 * Export script
 */

module.exports = scrape

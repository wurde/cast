'use strict'

/**
 * Dependencies
 */

const url = require('url')
const meow = require('meow')
const prompts = require('prompts')
const { requireConnectivity } = require('../helpers/connectivity')
const showHelp = require('../helpers/showHelp')
const printError = require('../helpers/printError')
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
 * Define helper
 */

// async function launchPage() {
//   const browser = await launchBrowser({
//     headless: true,
//     defaultViewport: {
//       width: 1024,
//       height: 800
//     }
//   })

//   const page = await browser.newPage()

//   return [browser, page]
// }

// function buildTargetURL(target) {
//   let targetURL = url.parse(target)
//   if (!targetURL.protocol) targetURL = url.parse('https://' + target)
//   if (!targetURL.hostname) printError('Error: Invalid URL')
//   return targetURL.href
// }

/**
 * Define script
 */

async function scrape(url=null, selector=null) {
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

  // const [browser, page] = await launchPage()
  // await page.goto(buildTargetURL(url))

  // let results = []
  // try {
  //   results = await page.evaluate(selector => {
  //     const elements = 
  //       Array.from(document.querySelectorAll(selector))
  //       .map(el => el.outerHTML)
        
  //     return elements
  //   }, selector)
  // } catch(err) {
  //   console.error(err)
  //   return err
  // } finally {
  //   browser.close()
  //   return results
  // }
}

/**
 * Export script
 */

module.exports = scrape

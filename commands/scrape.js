'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const meow = require('meow')
const prompts = require('prompts')
const puppeteer = require('puppeteer')
const { requireConnectivity } = require('../helpers/connectivity')
const showHelp = require('../helpers/showHelp')
const printError = require('../helpers/printError')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape URL

  Options
    --selector, -s   Define the CSS selector.
`, {
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

async function launchPage() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  })
  const page = await browser.newPage()

  return [browser, page]
}

function buildTargetURL(cli) {
  let targetURL = url.parse(cli.input[1])
  if (!targetURL.protocol) targetURL = url.parse('https://' + cli.input[1])
  if (!targetURL.hostname) printError('Error: Invalid URL', cli)
  return targetURL.href
}

async function promptForCSSSelector(selector) {
  if (!selector || selector.length === 0) {
    const selectorPrompt = await prompts({
      type: 'text',
      name: 'value',
      message: 'Enter a CSS selector to scrape the page',
      validate: value => value.length === 0 ? 'Minimum 1 character' : true,
    }, {
      onCancel: () => {
        console.log('onCancel')
        process.exit(1)
      }
    })

    selector = selectorPrompt.value
  }
  return selector
}

/**
 * Define script
 */

async function scrape() {
  console.log('process.argv', process.argv)
  process.exit(0)
  // If called from another script
  // if (arguments.length) {

  // const [browser, page] = await launchPage()
  // await page.goto(buildTargetURL(cli))
  // } else {
  //     // If called from cli:  
  // }
  // Handle URL, SELECTOR.
  // Handle prompt saving to file.
  
  requireConnectivity()
  showHelp(cli, [!cli.input[1]])

  let selector = cli.flags.selector

  console.log('')
  selector = await promptForCSSSelector(selector)

  const [browser, page] = await launchPage()
  await page.goto(buildTargetURL(cli))

  try {
    const results = await page.evaluate(selector => {
      const elements = 
        Array.from(document.querySelectorAll(selector))
        .map(el => el.outerHTML)
        
      return elements
    }, selector)

    const saveFilePrompt = await prompts({
      type: 'confirm',
      name: 'saveFile',
      initial: true,
      message: 'Do you want to save the results to a file? (Y/n)'
    })

    if (saveFilePrompt.saveFile) {
      const filenamePrompt = await prompts({
        type: 'text',
        name: 'filename',
        message: 'Enter the filename you\'d like to save to',
      })

      fs.writeFileSync(filenamePrompt.filename, results)
    }

    console.log('results:', results)

    return results
  } catch(err) {
    console.error(err)
  } finally {
    browser.close()
  }
}

/**
 * Export script
 */

module.exports = scrape

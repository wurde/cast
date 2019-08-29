'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const url = require('url')
const meow = require('meow')
const chalk = require('chalk')
const prompts = require('prompts')
const puppeteer = require('puppeteer')
const { requireConnectivity } = require('../helpers/connectivity')
const showHelpIfFlagged = require('../helpers/showHelpIfFlagged')

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

function print_error(message) {
  console.error(chalk.red(message))
  cli.showHelp()
}

async function launchPage() {
  const browser = await puppeteer.launch({
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
  if (!targetURL.hostname) print_error('Error: Invalid URL')
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
  requireConnectivity()
  showHelpIfFlagged([
    cli.flags.h,
    !cli.input[1]
  ], cli)

  let selector = cli.flags.selector

  console.log('')
  selector = promptForCSSSelector(selector)

  const [browser, page] = await launchPage()
  await page.goto(buildTargetURL(cli))

  try {
    const results = await page.evaluate(selector => {
      return Array.from(document.querySelectorAll(selector))
             .map(el => el.innerHTML)
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

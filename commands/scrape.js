'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const puppeteer = require('puppeteer')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape [options] <selector> <url>

  Options
    --url, -u   Automatically re-render when changes are detected.
    --selector, -s   Automatically re-render when changes are detected.
`, {
  flags: {
    url: {
      type: 'text',
    },
    selector: {
      type: 'text',
    },
  }
})

/**
 * Launch Page
 */

async function launchPage() {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  
  return [browser, page]
}

/**
 * Define script
 */

async function scrape() {
  if (cli.flags.h) cli.showHelp()
  if (!cli.flags.url) cli.showHelp()

  const [browser, page] = await launchPage()
  await page.goto(cli.flags.url)
  
  setTimeout(() => {
    browser.close()
  }, 5000)
}

/**
 * Export script
 */

module.exports = scrape

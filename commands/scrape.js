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
      alias: 'u'
    },
    selector: {
      type: 'text',
      alias: 's'
    },
  }
})

/**
 * Launch Page
 */

async function launchPage() {
  const browser = await puppeteer.launch({ headless: false })
  const page = browser.newPage()
  
  return [browser, page]
}

/**
 * Define script
 */

async function scrape() {
  if (cli.flags.h) cli.showHelp()
  
  const [browser, page] = await launchPage()
  
  setTimeout(() => {
    browser.close()
  }, 5000)
}
 
/**
 * Export script
 */

module.exports = scrape

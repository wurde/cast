'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const launchBrowser = require('../helpers/launchBrowser')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast perf URL
`, {
  description: 'Print performance metrics.'
})

/**
 * Define script
 */

async function perf() {
  showHelp(cli)

  let browser
  try {
    browser = await launchBrowser()
    const page = await browser.newPage()

    console.log('perf')
  } catch (err) {
    console.error(err)
  } finally {
    (browser) ? browser.close() : null
  }
}

/**
 * Export script
 */

module.exports = perf

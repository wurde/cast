'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape-n-drape
`, {
  description: 'Scrape web content and then display it.'
})

/**
 * Define script
 */

async function scrape_n_drape() {
  showHelp(cli)

  const results = await scrape()

  console.log(
    chalk.white.bold('\nOpen in your browser: ') +
    chalk.green.bold(`file://${results.path}`)
  )
}

/**
 * Export script
 */

module.exports = scrape_n_drape

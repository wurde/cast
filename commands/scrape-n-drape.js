'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const scrape = require('./scrape')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast scrape-n-drape
`)

/**
 * Define script
 */

function scrape_n_drape() {
  showHelp(cli)

  scrape('https://reddit.com')
}

/**
 * Export script
 */

module.exports = scrape_n_drape

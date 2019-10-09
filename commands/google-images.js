'use strict'

/**
 * Dependencies
 */

const scrape = require('./scrape')
const cheerio = require('cheerio')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google-images
`, {
  description: 'Search and download Google Images.'
})

 /**
 * Define script
 */

async function google_images() {
  showHelp(cli)

  // TODO Scrape images search.
  const result = await scrape('https://images.google.com')
  // TODO Parse all image URLs on page.
  // TODO Download all images.
}

/**
 * Export script
 */

module.exports = google_images

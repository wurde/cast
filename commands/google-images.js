'use strict'

/**
 * Dependencies
 */

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

function google_images() {
  showHelp(cli)
  console.log('google-images')
}

/**
 * Export script
 */

module.exports = google_images

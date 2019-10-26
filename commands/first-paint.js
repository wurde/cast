'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const perf = require('./perf')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast first-paint URL
`, {
  description: 'Print performance metrics.'
})

/**
 * Define script
 */

function firstPaint() {
  showHelp(cli)

  console.log('first-paint')
  // perf('url', { "FirstMeaningfulPaint": true })
}

/**
 * Export script
 */

module.exports = firstPaint

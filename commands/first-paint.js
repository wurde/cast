'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
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

async function firstPaint({ url }={}) {
  showHelp(cli, [(!url && cli.input.length < 2)])

  const targetURL = (url) ? url : cli.input[1]

  const FirstMeaningfulPaint = await perf({
    url: targetURL,
    filter: 'FirstMeaningfulPaint'
  })

  if (arguments.length === 0) {
    console.log('')
    console.log(' ', chalk.bold.green(FirstMeaningfulPaint))
    console.log('')
  }

  return FirstMeaningfulPaint
}

/**
 * Export script
 */

module.exports = firstPaint

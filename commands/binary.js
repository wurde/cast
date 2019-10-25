'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const hasFlag = require('has-flag')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast binary NUMBER [options]

  Options:
    --reverse, -r  Convert binary to decimal.
    --ascii        Print table of ASCII characters in binary.
`, {
  description: 'Convert decimal to binary.'
})

/**
 * Define script
 */

function binary() {
  if (cli.flags.ascii) {
    // Print conversion table for all ASCII characters.
    // TODO
  } else if (hasFlag('--reverse')) {
    // Filter for only binary numbers.
    const binary = process.argv.filter(e => e.match(/^[01]+$/))
    
    // Print conversion table
    // TODO
  } else {
    showHelp(cli, [cli.input.length < 2])

    const decimalNumber = cli.input[1]
    const binaryNumber = (decimalNumber >>> 0).toString(2)

    if (arguments.length === 0) {
      console.log(`\n  ${chalk.green.bold(binaryNumber)}\n`)
    }
  
    return binaryNumber
  }
}

/**
 * Export script
 */

module.exports = binary

'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast binary DECIMAL
`, {
  description: 'Convert decimal to binary.'
})

/**
 * Define script
 */

function binary() {
  showHelp(cli, [cli.input.length < 2])

  const n = cli.input[1]
  const b = (n >>> 0).toString(2)

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(b)}\n`)
  }

  return b
}

/**
 * Export script
 */

module.exports = binary

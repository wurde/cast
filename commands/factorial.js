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
    $ cast factorial N
`, {
  description: 'Print a factorial of N.'
})

/**
 * Define helpers
 */

function factorialOf(n) {
  if (n == 0) {
    return 1
  } else {
    return (n * factorialOf(n - 1))
  }
}

/**
 * Define script
 */

function factorial(n=null) {
  showHelp(cli, [(!n && cli.input.length < 2)])

  n = n || cli.input[1]
  const x = factorialOf(n)

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(x)}\n`)
  }

  return x
}

/**
 * Export script
 */

module.exports = factorial

'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const chalk = require('chalk')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const cache = {}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast fib N
`, {
  description: 'Print a Fibonacci sequence of N length.'
})

/**
 * Define helpers
 */

function cache_fib(n) {
  if (n <= 2) {
    return 1;
  } else if (cache[n]) {
    return cache[n]
  } else {
    cache[n] = cache_fib(n - 1) + cache_fib(n - 2);
    return cache[n]
  }
}

/**
 * Define script
 */

function fib(n=null) {
  showHelp(cli, [(!n && cli.input.length < 2)])

  n = n || cli.input[1]
  const x = cache_fib(n)

  if (arguments.length === 0) {
    console.log(`\n  ${chalk.green.bold(x)}\n`)
  }

  return x
}

/**
 * Export script
 */

module.exports = fib

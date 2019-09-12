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
    $ cast big-o
`)

/**
 * Define script
 */

function big_o() {
  showHelp(cli)
  console.log(`
Big O Classifications:

  Constant O(1)
  Logarithmic O(log n)
  Linear O(n)
  Linearithmic O(n log n)
  Polynomial O(n ^ c)
  Exponential O(c ^ n)
  Factorial O(n!)
`)
}

/**
 * Export script
 */

module.exports = big_o

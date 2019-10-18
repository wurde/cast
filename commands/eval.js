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
    $ cast eval EXPRESSION
`, {
  description: 'Evaluate an expression, statement, or sequence of statements.'
})

/**
 * Define script
 */

function run_eval() {
  showHelp(cli, [cli.input.length < 2])

  console.log('eval')
}

/**
 * Export script
 */

module.exports = run_eval

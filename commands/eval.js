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
    $ cast eval EXPRESSION
`, {
  description: 'Evaluate an expression, statement, or sequence of statements.'
})

/**
 * Define script
 */

function run_eval() {
  showHelp(cli, [cli.input.length < 2])

  const expression = cli.input.slice(1).join(' ')

  try {
    const x = eval(expression)

    if (arguments.length === 0) {
      console.log(`\n  ${chalk.green.bold(x)}\n`)
    }
    
    return x
  } catch(e) {
    console.error(`\n  ${chalk.red.bold(e.message)}: ${chalk.white.bold(expression)}\n`)
    return null
  }
}

/**
 * Export script
 */

module.exports = run_eval

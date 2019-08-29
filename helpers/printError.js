'use strict'

/**
 * Dependencies
 */

const chalk = require('chalk')

/**
 * Define helper
 */

function printError(message, cli) {
  console.error(chalk.red(message))
  cli.showHelp()
}

/**
 * Export helper
 */

module.exports = printError

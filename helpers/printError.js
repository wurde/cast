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
  if (!cli) process.exit(1)
  cli.showHelp()
}

/**
 * Export helper
 */

module.exports = printError

/**
 * Dependencies
 */

const chalk = require('chalk')

 /**
 * Define helper
 */

function handleInterrupt({ force, code, silent } = { force: false, code: 1, silent: false }) {
  function print_and_exit(code) {
    if (!silent) console.log(chalk.red.bold("Command killed by keyboard interrupt"))
    process.exit(code)
  }

  if (force) print_and_exit(code)
  process.on('SIGINT', () => { print_and_exit(code) })
}

/**
 * Export helper
 */

module.exports = handleInterrupt

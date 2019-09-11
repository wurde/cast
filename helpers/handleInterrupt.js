/**
 * Dependencies
 */

const chalk = require('chalk')

 /**
 * Define helper
 */

function handleInterrupt({ force, code } = { force: false, code: 1 }) {
  function print_and_exit(code) {
    console.log(chalk.red.bold("Command killed by keyboard interrupt"))
    process.exit(code)
  }

  if (force) print_and_exit(code)
  process.on('SIGINT', () => { print_and_exit(code) })
}

/**
 * Export helper
 */

module.exports = handleInterrupt

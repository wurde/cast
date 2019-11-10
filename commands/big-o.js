'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast big-o
`, {
  description: 'A list of Big O classifications.'
})

/**
 * Define script
 */

function big_o() {
  showHelp(cli)
  console.log(`
${chalk.white.bold('Big O Classifications:')}

  Constant.......${chalk.green.bold('O(1)')}
  Logarithmic....${chalk.green.bold('O(log n)')}
  Linear.........${chalk.green.bold('O(n)')}
  Linearithmic...${chalk.green.bold('O(n log n)')}
  Polynomial.....${chalk.green.bold('O(n ^ c)')}
  Exponential....${chalk.green.bold('O(c ^ n)')}
  Factorial......${chalk.green.bold('O(n!)')}
`)
}

/**
 * Export script
 */

module.exports = big_o

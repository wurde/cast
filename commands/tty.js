'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tty
`, {
  description: 'Print the file name of the terminal connected to standard input.'
})

/**
 * Define script
 */

function tty() {
  showHelp(cli)

  const tty = child_process.execSync('tty', { stdio: ['inherit', 'pipe', 'pipe'], encoding: 'utf8' });

  if (arguments.length === 0) {
    console.log('\n', chalk.white.bold('Current terminal: '), chalk.green.bold(tty));
  }

  return tty;
}

/**
 * Export script
 */

module.exports = tty

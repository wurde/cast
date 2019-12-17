'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const scen = require('scen');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast dashboard
`, {
  description: 'Custom displays.'
});

/**
 * Define script
 */

function dashboard() {
  showHelp(cli);

  const text = 'The quick brown fox \njumps over the lazy dog.';

  const output = scen(text, {
    title: 'Custom Title',
    padding: '2 10',
    textAlign: 'center',
    style: 'classic'
  }).split('\n')
  .map(line => line + '  ' + line)
  .join('\n');

  console.log('');
  console.log(chalk.white.bold(output), '\n');

  // TODO render the date.
  // TODO render weather app.
  // TODO solve for dynamic terminal width.
  // TODO render boxes side by side.
}

/**
 * Export script
 */

module.exports = dashboard;

'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const scen = require('scen');
const figlet = require('figlet');
const moment = require('moment');
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
  const date = figlet.textSync(moment().format('MMMM Do YYYY, h:mm:ss a'), {
    font: 'Small'
  });

  const output = scen(date, {
    title: 'Custom Title',
    padding: '2 10',
    textAlign: 'center',
    style: 'classic'
  })

  // const output = scen(date, {
  //   title: 'Custom Title',
  //   padding: '2 10',
  //   textAlign: 'center',
  //   style: 'classic'
  // }).split('\n')
  // .map(line => line + '  ' + line)
  // .join('\n');

  console.log('');
  console.log(chalk.white.bold(output), '\n');

  // TODO render the date.

  // TODO fit box to terminal width.
  // TODO render weather app.
  // TODO render boxes side by side.
}

/**
 * Export script
 */

module.exports = dashboard;

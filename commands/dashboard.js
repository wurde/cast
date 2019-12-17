'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
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

  console.log(
    scen(text, {
      title: 'Custom Title',
      padding: '2 6',
      textAlign: 'center',
      style: 'classic'
    })
  );

  // TODO render boxes side by side.
  // TODO render weather app.
}

/**
 * Export script
 */

module.exports = dashboard;

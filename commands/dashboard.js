'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
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

  // TODO render box with label.
  // TODO render multiple boxes.
  // TODO render weather app inside.

  console.log('dashboard');
}

/**
 * Export script
 */

module.exports = dashboard;

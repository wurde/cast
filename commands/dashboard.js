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

  console.log('dashboard');
}

/**
 * Export script
 */

module.exports = dashboard;

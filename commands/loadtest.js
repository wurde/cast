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
    $ cast loadtest
`, {
  description: 'Performance testing.'
});

/**
 * Define script
 */

function loadtest() {
  showHelp(cli);

  console.log('loadtest');
}

/**
 * Export script
 */

module.exports = loadtest;

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
    $ cast faker
`, {
  description: 'Fake data.'
});

/**
 * Define script
 */

function faker() {
  showHelp(cli);
  
  console.log('faker');
}

/**
 * Export script
 */

module.exports = faker;

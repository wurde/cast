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
    $ cast nodemon
`, {
  description: 'Manage filesystem monitoring scripts.'
});

/**
 * Define script
 */

function nodemon() {
  showHelp(cli);

  console.log('nodemon');
}

/**
 * Export script
 */

module.exports = nodemon;

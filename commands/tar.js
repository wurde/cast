'use strict';

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
    $ cast tar
`,
  {
    description: 'An archiving utility.'
  }
);

/**
 * Define script
 */

function tar() {
  showHelp(cli);
  console.log('tar');
}

/**
 * Export script
 */

module.exports = tar;

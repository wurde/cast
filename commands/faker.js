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

  Options:
    -c, --count NUM   Number of samples to return. (Default 10)
`, {
  description: 'Fake data.',
  flags: {
    count: {
      type: 'number',
      alias: 'c',
      default: 10,
    }
  }
});

/**
 * Define script
 */

function faker(count) {
  showHelp(cli);
  
  count = Math.abs(count || cli.flags.count);

  console.log('faker', count);
  // Print 10 sample fake data.
}

/**
 * Export script
 */

module.exports = faker;

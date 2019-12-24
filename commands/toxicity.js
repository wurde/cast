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
    $ cast toxicity
`, {
  description: 'Detect whether text contains toxic content.'
});

/**
 * Define script
 */

function toxicity() {
  showHelp(cli);

  console.log('toxicity');
}

/**
 * Export script
 */

module.exports = toxicity;

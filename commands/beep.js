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
    $ cast beep
`, {
  description: 'Play a beep sound.'
});

/**
 * Define script
 */

function beep() {
  showHelp(cli);

  console.log('beep');
};

/**
 * Export script
 */

module.exports = beep;

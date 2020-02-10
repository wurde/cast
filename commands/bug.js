'use strict'

/**
 * Dependencies
 */

const open = require('open');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast bug
`, {
  description: 'Opens the default browser and starts a new GitHub issue.'
})

/**
 * Define script
 */

async function bug() {
  showHelp(cli);

  await open("https://github.com/wurde/scripts/issues/new");
}

/**
 * Export script
 */

module.exports = bug;

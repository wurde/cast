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
    $ cast yt-search
`, {
  description: 'Search videos on YouTube.'
});

/**
 * Define script
 */

function yt_search() {
  showHelp(cli);
  console.log('yt-search');
}

/**
 * Export script
 */

module.exports = yt_search;

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
    $ cast yt-search QUERY
`, {
  description: 'Search videos on YouTube.'
});

/**
 * Define script
 */

function yt_search(query = null) {
  showHelp(cli, [(!query && cli.input.length < 2)]);

  query = query || cli.input.slice(1).join(' ');

  console.log('query', query);
}

/**
 * Export script
 */

module.exports = yt_search;

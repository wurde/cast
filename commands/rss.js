'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const Parser = require('rss-parser');

/**
 * Constants
 */

const parser = new Parser();
// Some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast rss
`, {
  description: 'RSS feeds management utility.',
})

/**
 * Define script
 */

function rss() {
  showHelp(cli)

  // TODO default - fetch and print most recent articles.
  // TODO fetch articles from a specific feed.
  // TODO allow filtering articles by keyword.
  // TODO print all feeds (show subscriptions top).
  // TODO add a feed.
  // TODO remove a feed.
  // TODO subscribe to feed.
  // TODO unsubscribe from feed.

  console.log('rss')
};

/**
 * Export script
 */

module.exports = rss;

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
    $ cast git-config
`, {
  description: 'Git configuration.'
});

/**
 * Define script
 */

function git_config() {
  showHelp(cli);
  console.log('git-config');
}

/**
 * Export script
 */

module.exports = git_config;

'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const chalk = require('chalk');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast count
`, {
  description: 'Count files in current directory.'
});

/**
 * Define script
 */

function count() {
  showHelp(cli);

  const files = fs.readdirSync('.');

  console.log(`\n  ${chalk.bold.white(files.length)}\n`);
}

/**
 * Export script
 */

module.exports = count;

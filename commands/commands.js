'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast commands

  Options
    --oneline   Print as a space separated oneliner.
`, {
  description: 'A list all of the commands.',
  flags: {
    oneline: {
      type: 'boolean'
    }
  }
});

/**
 * Define script
 */

function commands() {
  let files = fs.readdirSync(__dirname).map(cmd => path.basename(cmd, '.js'));

  if (cli.flags.oneline) {
    files = files.join(' ')
  }

  if (arguments.length === 0) {
    console.log(files);
  }

  return files;
}

/**
 * Export script
 */

module.exports = commands;

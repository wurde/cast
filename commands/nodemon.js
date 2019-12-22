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
    $ cast nodemon
  
  Options:
    -l, --list       List all monitoring scripts.
    -a, --add FILE   Add a new monitoring script.
    --remove FILE    Remove a monitoring script.
`, {
  description: 'Filesystem monitoring scripts.'
});

/**
 * Define script
 */

function nodemon() {
  showHelp(cli);

  // TODO use chokidar to recognize changes to files
  // located in ~/.nodemon and restart their respective
  // processes automatically.
  console.log('nodemon');
}

/**
 * Export script
 */

module.exports = nodemon;

'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const fse = require('fs-extra');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const CONFIG_DIR = path.join(process.env.HOME, '.nodemon');

/**
 * Define helpers
 */

function requireFile(file) {
  if (!fse.pathExistsSync(file)) throw new Error(`Missing file: ${file}`);
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast nodemon
  
  Options:
    -a, --add FILE   Add a new monitoring script.
    --remove FILE    Remove a monitoring script.
`, {
  description: 'Filesystem monitoring scripts.',
  flags: {
    add: { type: 'string', alias: 'a' },
    remove: { type: 'string' },
  }
});

/**
 * Define script
 */

function nodemon(command = null) {
  showHelp(cli);

  const flags = Object.keys(cli.flags);
  command = command || flags.pop() || 'list';

  fse.mkdirpSync(CONFIG_DIR);

  if (command === 'list' || command === 'l') {
    console.log('list');
  } else if (command === 'add' || command === 'a') {
    const file = cli.flags.add;
    console.log('add', file, fse.pathExistsSync(file));
    requireFile(file);
  } else if (command === 'remove') {
    const file = cli.flags.remove;
    console.log('remove', file, fse.pathExistsSync(file));
    requireFile(file);
  }

  // TODO use chokidar to recognize changes to files
  // located in ~/.nodemon and restart their respective
  // processes automatically.
}

/**
 * Export script
 */

module.exports = nodemon;

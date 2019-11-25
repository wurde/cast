'use strict';

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
    $ cast tar FILE...
`,
  {
    description: 'An archiving utility.'
  }
);

/**
 * Define script
 */

function tar(files=null, options={}) {
  showHelp(cli, [!files && cli.input.length < 2]);

  if (files.constructor !== Array) files = files.split(' ');
  files = files || cli.input.slice(1);

  console.log('files', files, files.constructor);
}

/**
 * Export script
 */

module.exports = tar;

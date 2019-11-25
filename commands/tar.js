'use strict';

/**
 * Dependencies
 */

const meow = require('meow');
const fs = require('fs');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');

/**
 * Define helpers
 */

function tarSync(args) {
  return child_process.spawnSync('tar', args, {
    cwd: process.cwd(),
    stdio: [null, 'inherit', 'inherit']
  });
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tar FILE...

  Option
    -f, --file ARCHIVE   Use archive file (Default output.tar).
`,
  {
    description: 'An archiving utility.',
    flags: {
      file: {
        type: 'string',
        alias: 'f'
      }
    }
  }
);

/**
 * Define script
 */

function tar(files=null, options={}) {
  showHelp(cli, [!files && cli.input.length < 2]);

  if (files && files.constructor !== Array) files = files.split(' ');
  files = files || cli.input.slice(1);

  files = files.filter(file => fs.existsSync(file));

  const output = cli.flags.file || 'output.tar';

  tarSync(['cf', output, ...files]);
}

/**
 * Export script
 */

module.exports = tar;

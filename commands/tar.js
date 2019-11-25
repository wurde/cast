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
    --list               List the contents of an archive.
    --extract            Extract files from an archive.
`,
  {
    description: 'An archiving utility.',
    flags: {
      file: {
        type: 'string',
        alias: 'f'
      },
      list: {
        type: 'boolean'
      },
      extract: {
        type: 'boolean'
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

  const output = cli.flags.file || options.file || 'output.tar';

  if (files.length > 0) {
    const args = [output, ...files];

    if (options.list || cli.flags.list) {
      args.shift() && args.unshift('tvf');
    } else if (options.extract || cli.flags.extract) {
      args.shift() && args.unshift('xvf');
    } else {
      args.unshift('cvaf');
    }

    return tarSync(args);
  } else {
    return null;
  }
}

/**
 * Export script
 */

module.exports = tar;

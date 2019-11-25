'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process');
const prompt = require('prompt');
const chalk = require('chalk');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Define helpers
 */

function git(args) {
  return child_process.spawnSync('git', args, {
    cwd: process.cwd(),
    stdio: [null, 'inherit', 'inherit']
  });
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast gitcommit

  Options
    --message, -m <message>  Commit message
    --amend                  Amend previous commit
`, {
  description: 'Create a git commit.',
  flags: {
    message: {
      type: 'string',
      alias: 'm'
    },
    amend: {
      type: 'boolean'
    }
  }
});

/**
 * Define script
 */

function gitcommit() {
  showHelp(cli);

  const result = git(['add', '-A']);

  if (result.status === 0) {
    const message = cli.flags.message;
    const args = ['commit'];

    if (cli.flags.amend) args.push('--amend');
    args.push('-m');

    if (cli.flags.message) {
      git(args.concat(message));
    } else {
      prompt.message = '';
      prompt.get({
        name: 'message',
        description: chalk.white.bold('Message'),
        required: true
      }, (err, result) => {
        git(args.concat(result.message));
      })
    }
  }
}

/**
 * Export script
 */

module.exports = gitcommit;

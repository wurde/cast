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
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit']
};

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

  const result = child_process.spawnSync('git', ['add', '-A'], config);

  if (result.status === 0) {
    const message = cli.flags.message;

    if (cli.flags.message) {
      child_process.spawnSync('git', ['commit', '-m', message], config);
    } else {
      prompt.message = '';
      prompt.get({
        name: 'message',
        description: chalk.white.bold('Message'),
        required: true
      }, (err, result) => {
        child_process.spawnSync('git', ['commit', '-m', result.message], config);
      })
    }
  }
}

/**
 * Export script
 */

module.exports = gitcommit;

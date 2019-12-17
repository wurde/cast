'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const { table } = require('table');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');

/**
 * Define helpers
 */

function printConfig(data) {
  const keys = Object.keys(data);
  const output = table(Object.entries(data));
  console.log(output);
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast git-config [options]

  Options:
    --global   use global config file
    --local    use repository config file
    --system   use system config file
`,
  {
    description: 'Git configuration.'
  }
);

/**
 * Define script
 */

function git_config(options) {
  showHelp(cli);

  options = options || Object.keys(cli.flags).map(x => `--${x}`);

  const res = child_process.spawnSync('git', ['config', '--list', ...options], { encoding: 'utf8' });

  if (res.status === 0) {
    const data = res.stdout.trim().split('\n').reduce((obj, x) => {
      const item = x.split('=');
      obj[item[0]] = item[1];
      return obj;
    }, {});

    if (arguments.length === 0) {
      printConfig(data);
    }

    return data;
  }
}

/**
 * Export script
 */

module.exports = git_config;

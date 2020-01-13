'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const meow = require('meow');
const autocannon = require('autocannon');
const showHelp = require('../helpers/showHelp');

/**
 * Define helpers
 */

function loadConfig(filePath) {
  if (!filePath) return;
  if (!fs.existsSync(filePath)) return;

  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast loadtest [options] URL

  Options:
    -t, --title NAME        An identifier for this test.
    -c, --connections NUM   Number of concurrent connections to use (Default 10).
    -d, --duration SEC      Number of seconds to run (Default 10).
    -a, --amount NUM        Number of requests to make. Overrides duration.
    -b, --bailout NUM       Number of errors before quitting.
    --overallRate NUM       Rate of requests per second. No rate limiting by default.
    --config FILE           Set autocannon configuration.
    --soak                  Run a soak test.
    --spike                 Run a spike test.
    --stress                Run a stress test.
`, {
  description: 'Load performance testing.',
  flags: {
    title: {
      type: 'string',
      alias: 't',
    },
    connections: {
      type: 'number',
      alias: 'c',
      default: 10,
    },
    duration: {
      type: 'number',
      alias: 'd',
      default: 10,
    },
    amount: {
      type: 'number',
      alias: 'a',
    },
    bailout: {
      type: 'number',
      alias: 'b',
    },
    overallRate: { type: 'string' },
    config: { type: 'string' },
    soak: { type: 'boolean' },
    spike: { type: 'boolean' },
    stress: { type: 'boolean' }
  }
});

/**
 * Define script
 */

async function loadtest(url, options = {}) {
  showHelp(cli, [(!url && cli.input.length < 2)]);

  url = url || cli.input[1];
  const title = options.title || cli.flags.title;
  const connections = options.connections || cli.flags.connections;
  const duration = options.duration || cli.flags.duration;
  const amount = options.amount || cli.flags.amount;
  const bailout = options.bailout || cli.flags.bailout;
  const overallRate = options.overallRate || cli.flags.overallRate;

  const config = loadConfig(cli.flags.config);

  console.log('');
  const spinner = ora({
    text: `Sending requests to ${chalk.white.bold(url)}\n`,
    spinner: 'pong'
  }).start();

  try {
    const result = await autocannon({
      url,
      title,
      connections,
      duration,
      amount,
      bailout,
      overallRate,
      ...config
    });

    spinner.succeed(`Completed tests for ${chalk.white.bold(url)}\n`);

    if (arguments.length === 0) {
      console.log(result);
    }

    return result;
  } catch (err) {
    spinner.fail(`Failed to test ${chalk.white.bold(url)}\n`);
    console.error(err);
  }
}

/**
 * Export script
 */

module.exports = loadtest;

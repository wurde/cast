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
    --soak                  Run a soak test (3 hours, 100 requests per second).
    --spike                 Run a spike test. (5 minutes, 10,000 connections).
    --stress                Run a stress test. (6 hours, 1,000 connections, max 5 errors).
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
  let title = options.title || cli.flags.title;
  let connections = options.connections || cli.flags.connections;
  let duration = options.duration || cli.flags.duration;
  let amount = options.amount || cli.flags.amount;
  let bailout = options.bailout || cli.flags.bailout;
  let overallRate = options.overallRate || cli.flags.overallRate;

  const config = loadConfig(cli.flags.config);

  if (cli.flags.soak) {
    duration = 60 * 60 * 3 // 3 hours
    overallRate = 100 // requests per second
  } else if (cli.flags.spike) {
    connections = 10000 // 10k connections
    duration = 60 * 5 // 5 minutes
  } else if (cli.flags.stress) {
    connections = 1000 // 1k connections
    duration = 60 * 60 * 6 // 6 hours
    bailout = 5; // bail after 5 errors
  }

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

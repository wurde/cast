'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
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
    -c, --connections NUM   Number of concurrent connections to use.
    -d, --duration SEC      Number of seconds to run.
    -r, --rate NUM          Number of requests per second.
    --config FILE           Set autocannon configuration.
    --soak                  Run a soak test.
    --spike                 Run a spike test.
    --stress                Run a stress test.
`, {
  description: 'Load performance testing.',
  flags: {
    connection: {
      type: 'string',
      alias: 'c'
    },
    duration: {
      type: 'string',
      alias: 'd'
    },
    rate: {
      type: 'string',
      alias: 'r'
    },
    config: { type: 'string' },
    soak: { type: 'boolean' },
    spike: { type: 'boolean' },
    stress: { type: 'boolean' }
  }
});

/**
 * Define script
 */

async function loadtest(url) {
  showHelp(cli, [(!url && cli.input.length < 2)]);

  url = url || cli.input[1];

  const config = loadConfig(cli.flags.config);

  // const result = await autocannon({ url, ...config });
  // console.log(result);
}

/**
 * Export script
 */

module.exports = loadtest;

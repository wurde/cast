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
    -c, --connections NUM   Number of concurrent connections to use (Default 10).
    -d, --duration SEC      Number of seconds to run (Default 10).
    --config FILE           Set autocannon configuration.
    --soak                  Run a soak test.
    --spike                 Run a spike test.
    --stress                Run a stress test.
`, {
  description: 'Load performance testing.',
  flags: {
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
  const connections = options.connections || cli.flags.connections;
  const duration = options.duration || cli.flags.duration;
  const rate = options.rate || cli.flags.rate;

  const config = loadConfig(cli.flags.config);

  console.log({ url, connections, duration, rate, ...config })
  // const result = await autocannon({
  //   url,
  //   connections,
  //   duration,
  //   ...config
  // });

  // if (arguments.length === 0) {
  //   console.log(result);
  // }

  // return result;
}

/**
 * Export script
 */

module.exports = loadtest;

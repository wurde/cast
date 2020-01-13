'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const autocannon = require('autocannon');
const showHelp = require('../helpers/showHelp');

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
    --soak                  Run a soak test.
    --spike                 Run a spike test.
    --stress                Run a stress test.
`, {
  description: 'Load performance testing.'
});

/**
 * Define script
 */

async function loadtest(url) {
  showHelp(cli, [(!url && cli.input.length < 2)]);

  url = url || cli.input[1];

  const result = await autocannon({ url });

  console.log(result);
}

/**
 * Export script
 */

module.exports = loadtest;

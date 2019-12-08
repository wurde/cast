'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');

/**
 * Constants
 */

const SEC = 1000; // 1 second in milliseconds

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast beep [MILLISECONDS]
`, {
  description: 'Play a beep sound.'
});

/**
 * Define script
 */

async function beep(ms = null) {
  showHelp(cli);

  ms = ms || cli.input[1] || SEC;

  const noise = child_process.spawn('speaker-test', 
    ['-t', 'sine', '-f', '1000', '-p', ms]
  );

  await sleep(ms);

  await child_process.spawnSync('kill', ['-9', noise.pid]);
};

/**
 * Export script
 */

module.exports = beep;

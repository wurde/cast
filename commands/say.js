'use strict'

/**
 * Dependencies
 */

const child_process = require('child_process');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const which = require('../helpers/which');

/**
 * Constants
 */

const hasSpdSay = which('spd-say');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast say MESSAGE
`, {
  description: 'Send text-to-speech output to speech-dispatcher.',
})

/**
 * Define script
 */

function say(msg=null) {
  showHelp(cli, [(!msg && cli.input.length < 2)]);

  msg = msg || cli.input.slice(1).join(' ');

  if (!hasSpdSay) {
    throw new Error('Missing dependency: `spd-say`');
  }

  child_process.execSync(`spd-say '${msg}'`, { encoding: 'utf8' });
}

/**
 * Export script
 */

module.exports = say;

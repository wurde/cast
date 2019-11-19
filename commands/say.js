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
  
  Options:
    -t --voice-type    Set the preferred voice type.
                       (male1, male2, male3, female1, female2
                        female3, child_male, child_female)
`, {
  description: 'Send text-to-speech output to speech-dispatcher.',
  flags: {
    voiceType: {
      type: 'string',
      alias: 't'
    }
  }
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

  const args = [`'${msg}'`];

  if (cli.flags.voiceType) {
    args.push(`--voice-type=${cli.flags.voiceType}`);
  }

  child_process.spawnSync(`spd-say`, args, { encoding: 'utf8' });
}

/**
 * Export script
 */

module.exports = say;

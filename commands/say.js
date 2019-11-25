'use strict';

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

const cli = meow(
  `
  Usage
    $ cast say MESSAGE
  
  Options:
    -t, --voice-type    Set the preferred voice type.
                        (male1, male2, male3, female1, female2
                        female3, child_male, child_female)
    -r, --rate          Set the rate of the speech.
                        (between -100 and +100, default: 0)
    -p, --pitch         Set the pitch of the speech.
                        (between -100 and +100, default: 0)
    -i, --volume        Set the volume (intensity) of the speech.
                        (between -100 and +100, default: 0)
`,
  {
    description: 'Send text-to-speech output to speech-dispatcher.',
    flags: {
      voiceType: {
        type: 'string',
        alias: 't'
      },
      rate: {
        type: 'string',
        alias: 'r'
      },
      pitch: {
        type: 'string',
        alias: 'p'
      },
      volume: {
        type: 'string',
        alias: 'i'
      }
    }
  }
);

/**
 * Define script
 */

function say(msg = null) {
  showHelp(cli, [!msg && cli.input.length < 2]);

  msg = msg || cli.input.slice(1).join(' ');

  if (!hasSpdSay) {
    throw new Error('Missing dependency: `spd-say`');
  }

  const args = [`'${msg}'`];

  if (cli.flags.voiceType) {
    args.push(`--voice-type=${cli.flags.voiceType}`);
  }
  if (cli.flags.rate) {
    args.push(`--rate=${cli.flags.rate}`);
  }
  if (cli.flags.pitch) {
    args.push(`--pitch=${cli.flags.pitch}`);
  }
  if (cli.flags.volume) {
    args.push(`--volume=${cli.flags.volume}`);
  }

  child_process.spawnSync(`spd-say`, args, { encoding: 'utf8' });
}

/**
 * Export script
 */

module.exports = say;

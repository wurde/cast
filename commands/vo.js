'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const moment = require('moment');
const arecord = require('./arecord');
const mkdir = require('../helpers/mkdir');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const AUDIO_DIR = path.join(process.env.HOME, 'Audio', 'Voiceovers');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast vo WORDS...
`, {
  description: 'Voiceover recording.'
});

/**
 * Define script
 */

function vo(words) {
  showHelp(cli, [(!words && cli.input.length < 2)]);

  words = words || cli.input.slice(1).join(' ');
  let filename = moment(new Date()).format('YYYY-MM-DD_hhmm') + '.wav';
  let fullpath = path.join(AUDIO_DIR, filename);

  mkdir(AUDIO_DIR);

  console.log({ fullpath });
  process.exit(0);

  arecord(fullpath, {
    channel: 2,
    rate: 44100,
    format: 'S32_LE'
  });

  // TODO save words,audio-path in SQLite database
}

/**
 * Export script
 */

module.exports = vo;

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
const Database = require('../helpers/Database');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const AUDIO_DIR = path.join(process.env.HOME, 'Audio', 'Voiceovers');
const DB_PATH = path.join(process.env.HOME, '.voiceovers.sqlite3');
const QUERIES = {
  insertVoiceover: () => `
    INSERT OR IGNORE INTO voiceovers (
      words, audio_path
    ) VALUES ($1, $2);
  `,
  createTables: () => `
    CREATE TABLE IF NOT EXISTS voiceovers (
      id integer PRIMARY KEY,
      words text,
      audio_path text UNIQUE,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
  `
};

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

async function vo(words) {
  showHelp(cli, [(!words && cli.input.length < 2)]);

  words = words || cli.input.slice(1).join(' ');
  const filename = moment(new Date()).format('YYYY-MM-DD_hhmmss') + '.wav';
  const fullpath = path.join(AUDIO_DIR, filename);

  const db = new Database(DB_PATH, QUERIES);
  await db.exec('createTables');

  mkdir(AUDIO_DIR);

  await db.exec('insertVoiceover', null, { bind: [words, fullpath] });

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

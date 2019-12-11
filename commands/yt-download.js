'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const url = require('url');
const meow = require('meow');
const ytdl_core = require('ytdl-core');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const YT_URL = 'https://www.youtube.com';

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast yt-download LINK_OR_ID
`, {
  description: 'Download videos on YouTube.'
});

/**
 * Define script
 */

async function yt_download(link_or_id = null) {
  showHelp(cli, [(!link_or_id && cli.input.length < 2)]);

  link_or_id = link_or_id || cli.input[1];

  console.log('link_or_id', link_or_id);
  process.exit(0);
  const youtube_url = url.parse(link);

  ytdl_core(link).pipe(fs.createWriteStream(`${(youtube_url.query || 'youtube')}.flv`));
}

/**
 * Export script
 */

module.exports = yt_download;

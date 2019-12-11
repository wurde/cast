'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const meow = require('meow');
const ytdl_core = require('ytdl-core');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const YT_URL = 'https://www.youtube.com';

/**
 * Define helper
 */

function buildLink(link_or_id) {
  if (link_or_id.match(/youtube\.com/)) {
    return link_or_id;
  }

  return `${YT_URL}/watch?v=${link_or_id}`;
};

function buildOutput(link) {
  return `${link.match(/v=(.*)$/)[1]}.flv`;
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast yt-download LINK_OR_ID
  
  Options:
    -o, --output    Output file (Default 'youtube.flv').
`, {
  description: 'Download videos on YouTube.',
  flags: {
    output: {
      type: 'string',
      alias: 'o'
    }
  }
});

/**
 * Define script
 */

async function yt_download(link_or_id = null, options = {}) {
  showHelp(cli, [(!link_or_id && cli.input.length < 2)]);

  link_or_id = link_or_id || cli.input[1];

  const link = buildLink(link_or_id);
  const output = options.output || cli.flags.output || buildOutput(link);

  ytdl_core(link).pipe(fs.createWriteStream(output));
}

/**
 * Export script
 */

module.exports = yt_download;

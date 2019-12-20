'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const meow = require('meow');
const chalk = require('chalk');
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

function downloadVideo(link, outputPath) {
  return new Promise((resolve, reject) => {
    const video = ytdl_core(link);
    let starttime;

    video.on('error', err => reject(err));

    video.once('response', () => {
      starttime = Date.now();
      console.log(
        chalk.white.bold('\n  Downloading: ') + chalk.green.bold(link)
      );
    });

    video.on('progress', (chunkLength, downloaded, total) => {
      const percent = downloaded / total;
      const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`  ${(percent * 100).toFixed(2)}% downloaded `);
      process.stdout.write(
        `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
          total /
          1024 /
          1024
        ).toFixed(2)}MB)\n`
      );
      process.stdout.write(
        `  running for: ${downloadedMinutes.toFixed(2)}minutes`
      );
      process.stdout.write(
        `, estimated time left: ${(
          downloadedMinutes / percent -
          downloadedMinutes
        ).toFixed(2)}minutes `
      );
      readline.moveCursor(process.stdout, 0, -1);
    });

    video.on('end', () => {
      process.stdout.write('\n\n');
      resolve();
    });

    video.pipe(fs.createWriteStream(outputPath));
  });
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast yt-download [options] LINK_OR_ID
  
  Options:
    --output FILE   Output file (Default '$ID.flv').
    --dir DIR       Set the output directory (Default '.').
`, {
  description: 'Download videos on YouTube.',
  flags: {
    output: { type: 'string' },
    dir: { type: 'string' }
  }
});

/**
 * Define script
 */

async function yt_download(link_or_id = null, options = {}) {
  if (process.argv.length === 4) {
    link_or_id = process.argv[3];
  }

  showHelp(cli, [(!link_or_id && cli.input.length < 2)]);

  link_or_id = link_or_id || cli.input[1];

  const link = buildLink(link_or_id);
  const output = options.output || cli.flags.output || buildOutput(link);
  const dir = options.dir || cli.flags.dir || '.';
  const outputPath = path.join(dir, output);

  await downloadVideo(link, outputPath);
}

/**
 * Export script
 */

module.exports = yt_download;

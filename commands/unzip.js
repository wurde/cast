'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const chalk = require('chalk');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, 'inherit', 'inherit'],
  detached: true
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast unzip
`, {
  description: 'Extract all zipped files in the current directory.',
});

/**
 * Define script
 */

function unzip() {
  showHelp(cli);

  const files = fs
    .readdirSync(".")
    .filter(file => fs.statSync(file).isFile() && file.match(/\.zip$/));

  for (let i = 0; i < files.length; i++) {
    console.log(`\n  Extracting: ${chalk.bold.white(files[i])}\n`);

    child_process.spawn("unzip",
      [files[i], "-d", path.basename(files[i], path.extname(files[i]))], config);
  }
}

/**
 * Export script
 */

module.exports = unzip;

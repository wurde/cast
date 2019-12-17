'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const child_process = require('child_process');

/**
 * Define helper
 */

function execBin(name) {
  const bin = path.resolve(__dirname, '..', 'node_modules', '.bin', name);

  if (!fs.existsSync(bin)) {
    console.error(
      chalk.red.bold('Missing binary. Run `npm install` and try again.')
    );
    process.exit(1);
  }

  child_process.fork(bin);
};

/**
 * Export helper
 */

module.exports = execBin;

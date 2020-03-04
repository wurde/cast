'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const chalk = require('chalk');

/**
 * Define helper
 */

function printDir(path) {
  const files = fs.readdirSync(path);

  for (const file of files) {
    console.log(`  ${chalk.white.bold(file)}`);
  }
}

/**
 * Export helper
 */

module.exports = printDir;

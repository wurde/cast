'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const meow = require('meow');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');
const npm = require("../helpers/npm");

/**
 * Constants
 */

const code = `'use strict'

const chokidar = require('chokidar');

chokidar.watch('.').on('all', (event, path) => {
  console.log(event, path);
});
`;

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast watch
`, {
  description: 'Setup a file watcher for the current directory.',
});

async function fswatch() {
  showHelp(cli);

  console.log(chalk.green.bold("\nSetup a file watcher for the current directory.\n"))

  // Setup the project for npm.
  if (!fs.existsSync("package.json")) {
    npm(["init", "-y"]);
  }

  const config = JSON.parse(fs.readFileSync('./package.json'));

  // Ensure chokidar is installed.
  if (!config.devDependencies || !config.devDependencies.chokidar) {
    npm(["install", "--save-dev", "chokidar"]);
  }

  // Setup example script.
  if (!config.scripts || !config.scripts.chokidar) {
    config.scripts.watch = "node watch.js";
    fs.writeFileSync("./package.json", JSON.stringify(config, null, 2));
  }
  if (!fs.existsSync("./watch.js")) {
    fs.writeFileSync("./watch.js", code);
  }
}

/**
 * Export script
 */

module.exports = fswatch

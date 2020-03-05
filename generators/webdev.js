'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function main() {
  console.log(chalk.white.bold(`
    /////////////////
    Generator:`, chalk.green.bold('webdev\n')
  ));

  // Check if .git/ already exists.
  if (fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.error(chalk.red.bold('Project already exists. Found a .git/ directory.'))
    process.exit(1);
  }

  // Copy files:
  //   LICENSE
  //   .editorconfig
  //   tsconfig.json
  //   Dockerfile
  //   server.js
  //   webpack.config.js
  //   package.json
  //   public/index.html
  //   src/index.ts

  // Npm install.

  // Git init commit.
}

module.exports = main();

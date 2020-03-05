'use strict'

const chalk = require('chalk');

function main() {
  console.log(chalk.white.bold(`
    /////////////////
    Generator:`, chalk.green.bold('webdev\n')
  ));

  // Check if .git/ already exists.

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

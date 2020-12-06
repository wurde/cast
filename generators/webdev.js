'use strict'

const chalk = require('chalk');
const npm = require("../helpers/npm");
const git = require("../helpers/git");

function main() {
  console.log(chalk.white.bold(`
    /////////////////
    Generator:`, chalk.green.bold('webdev\n')
  ));

  npm(["init", "@open-wc"]);
}

module.exports = main();

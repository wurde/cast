"use strict";

/**
 * Dependencies
 */

const fs = require("fs");
const chalk = require("chalk");
const meow = require("meow");
const showHelp = require("../helpers/showHelp");
const npm = require("../helpers/npm");

/**
 * Parse args
 */

const cli = meow(
  `
  Usage
    $ cast babel-init 
  
  Options 
    --stage, -s Specify which stage of features you want supported (0-3) -- defaults to stage 0.
`,
  {
    description:
      "Bootstrap a babel project with support for stage-0 and above features.",
    flags: {
      stage: { type: "string", alias: "s" },
    },
  }
);

/**
 * Define script
 */

// TODO: prompt user for Typescript boilerplate generation
function babel() {
  showHelp(cli);
  npm(["init", "-y"]);

  console.log(chalk.green.bold("Installing dependencies..."));
  npm(["install", "--save-dev", "@babel/cli", "@babel/core"]);
  npm(["install", "--save", "@babel/polyfill"]);

  let stage;
  switch (cli.flags.stage) {
    case "0":
      stage = "stage-0";
      break;
    case "1":
      stage = "stage-1";
      break;
    case "2":
      stage = "stage-2";
      break;
    case "3":
      stage = "stage-3";
      break;
    default:
      stage = "stage-0";
  }
}

/**
 * Export script
 */

module.exports = babel();

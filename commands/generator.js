"use strict";

/**
 * Dependencies
 */

const fs = require("fs");
const path = require("path");
const meow = require("meow");
const printDir = require("../helpers/printDir");
const printError = require("../helpers/printError");

/**
 * Constants
 */

const GENERATOR_DIR = path.join(__dirname, "..", "generators");

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast generator NAME
`, {
    description: "Invoke code generator."
});

/**
 * Define script
 */

function generator() {
  if (cli.input.length < 2) {
    console.log("\nGenerators:\n");
    printDir(GENERATOR_DIR);
    process.exit(1);
  }

  const file = cli.input[1];
  const generator = path.join(GENERATOR_DIR, file);
  if (!fs.existsSync(generator)) printError(`Missing file: ${generator}`);

  require(generator);
}

/**
 * Export script
 */

module.exports = generator;

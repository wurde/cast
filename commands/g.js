"use strict";

/**
 * Dependencies
 */

import fs from "fs";
import path from "path";
import meow from "meow";
import chalk from "chalk";
import printError from "../helpers/printError";

/**
 * Constants
 */

const GENERATOR_DIR = path.join(__dirname, "..", "generators");

/**
 * Parse args
 */

const cli = meow(
  `
  Usage
    $ cast generator NAME
`,
  {
    description: "Invoke code generator."
  }
);

/**
 * Define script
 */

function generator() {
  if (cli.input.length < 2) {
    console.log("\nGenerators:\n");
    const files = fs.readdirSync(GENERATOR_DIR);
    for (const file of files) {
      console.log(`  ${chalk.white.bold(path.basename(file, ".js"))}`);
    }
    process.exit(1);
  }

  const file = cli.input[1];
  const generator = path.join(GENERATOR_DIR, file + ".js");
  if (!fs.existsSync(generator)) printError(`Missing file: ${generator}`);

  require(generator);
}

/**
 * Export script
 */

module.exports = generator;

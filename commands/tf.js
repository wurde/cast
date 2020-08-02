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

const TEMPLATE_DIR = path.join(__dirname, "..", "templates");

/**
 * Parse args
 */

const cli = meow(
  `
  Usage
    $ cast tf
`,
  {
    description: "Setup Terraform boilerplate."
  }
);

/**
 * Define script
 */

function terraform() {
  console.log("terraform")
}

/**
 * Export script
 */

module.exports = terraform;

"use strict";

/**
 * Dependencies
 */

const path = require("path");
const meow = require("meow");

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

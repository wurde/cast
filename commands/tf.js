"use strict";

/**
 * Dependencies
 */

const fs = require("fs");
const path = require("path");
const meow = require("meow");
const mkdir = require("../helpers/mkdir");

/**
 * Constants
 */

const TEMPLATE_DIR = path.join(__dirname, "..", "templates");
const GH_WORKFLOWS = ".github/workflows";
const TF_CD = path.join(TEMPLATE_DIR, "cd.yaml");
const TF_CI = path.join(TEMPLATE_DIR, "ci.yaml");
const TF_CONFIG = path.join(TEMPLATE_DIR, "terraform.tf");

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
  let file = '';

  /**
   * Write workflows for GitHub Action CI/CD.
   */

  mkdir(".github/workflows");

  file = path.join(GH_WORKFLOWS, "cd.yaml");
  if (!fs.existsSync(file)) {
    console.log(`\nCopying ${path.basename(file)}`);
    fs.copyFileSync(TF_CD, file);
  }
  file = path.join(GH_WORKFLOWS, "ci.yaml");
  if (!fs.existsSync(file)) {
    console.log(`\nCopying ${path.basename(file)}`);
    fs.copyFileSync(TF_CI, file);
  }

  file = "terraform.tf";
  if (!fs.existsSync(file)) {
    console.log(`\nCopying ${file}`);
    fs.copyFileSync(TF_CONFIG, file);
  }
}

/**
 * Export script
 */

module.exports = terraform;

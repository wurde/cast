'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tf-encode FILE
`, {
  description: 'Convert Kubernetes YAML configuration into Terraform configuration.',
});

/**
 * Define script
 */

function tf_encode(file) {
  showHelp(cli, [(!file && cli.input.length < 2)]);

  file = file || cli.input.slice(1).join(' ');
  if (!fs.existsSync(file)) throw Error(`File "${file}" does not exist.`);

  const out = child_process.execSync(`echo 'yamldecode(file("${file}"))' | terraform console`, {
    encoding: "utf-8"
  });

  console.log(out);

  const filename = path.basename(file, path.extname(file));
  fs.writeFileSync(`${filename}.tf`, out);
}

/**
 * Export script
 */

module.exports = tf_encode;

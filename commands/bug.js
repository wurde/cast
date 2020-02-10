'use strict'

/**
 * Dependencies
 */

const open = require('open');
const meow = require('meow');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const url = "https://github.com/wurde/scripts/issues/new";
const header =
  "<!-- Please answer these questions to assist in debugging the issue. Thanks! -->";
const questions = `

<!--
If possible, provide steps to reproduce the error.
-->

### What did you expect to see?

### What did you see instead?

`;

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast bug
`, {
  description: 'Opens the default browser and starts a new GitHub issue.'
})

/**
 * Define script
 */

async function bug() {
  showHelp(cli);

  let body = "";
  body += header;
  body += questions;

  await open(url + "?body=" + encodeURIComponent(body));
}

/**
 * Export script
 */

module.exports = bug;

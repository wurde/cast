'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const which = require('../helpers/which');
const child_process = require("child_process");
const showHelp = require('../helpers/showHelp');
const uuid = require('uuid');

/**
 * Constants
 */

const hasArecord = which('arecord');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast arecord-kws [options] LABEL
`, {
  description: 'Record sound.',
});

// TODO ensure using correct device (arecord --list-devices).
// TODO record consecutive clips.

async function arecord_kws() {
  showHelp(cli);

  const id = uuid.v4().split('-')[0];

  const args = [
    "--duration=1",
    "--rate=16000",
    "--format=S16_LE",
    "--file-type", "wav",
    `${id}.wav`
  ]

  if (hasArecord) {
    await child_process.spawnSync("arecord", args, {
      cwd: process.cwd(),
      stdio: ["inherit", "inherit", "inherit"]
    });
  } else {
    throw new Error('Requires ALSA soundcard driver.');
  }
}

/**
 * Export script
 */

module.exports = arecord_kws;

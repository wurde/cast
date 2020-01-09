'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const termSize = require('term-size');
const showHelp = require('../helpers/showHelp');

/**
 * Parse args
 */

const display = (text, width, tick) => {
  const textStr = text.padStart(width + text.length);
  const msgLength = tick % textStr.length;
  const sliceStr = textStr.slice(msgLength, width + msgLength);

  return sliceStr.padEnd(width);
};


/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast ticker MESSAGE
`, {
  description: 'A scrolling display.'
});

/**
 * Define script
 */

function ticker(message) {
  showHelp(cli, [(!message && cli.input.length < 2)]);

  const msg = message || cli.input.slice(1).join(' ');
  const {columns} = termSize();

  let tick = 0;
  setInterval(() => {
    process.stdout.write(display(msg, columns, tick));
    tick++;
  }, 100);
}

/**
 * Export script
 */

module.exports = ticker;

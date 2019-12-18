'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const scen = require('scen');
const boxen = require('boxen');
const widestLine = require('widest-line');
const figlet = require('figlet');
const termSize = require('term-size');
const moment = require('moment');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const { columns: cols, rows } = termSize();

/**
 * Define helpers
 */

function createScene(content, options = {}) {
  const title = options.title;
  const contentLength = content.split('\n')[0].length;
  let output;
  let outputWidth = cols;
  let widthConfig = cols;

  while (widthConfig > 0 && contentLength < cols && outputWidth >= cols) {
    output = scen(content, {
      textAlign: 'center',
      style: 'single',
      width: widthConfig,
      title,
    });
    const lines = output.split('\n');
    outputWidth = lines[0].length;
    widthConfig--;
  }
}

function calcPaddingX(cols, maxTextLength) {
  return Math.floor(cols / 2 - 1 - maxTextLength / 2)
}

function createPanel(content, options = {}) {
  // Check if paddingX is negative;

  const output = boxen(content, options);

  return output;
}

function joinScenes(scenes) {
  const output = scen(text, {
    title: ' UTC TIME ',
    padding: '2 10',
    textAlign: 'center',
    style: 'single',
  }).split('\n')
  .map(line => line + '  ' + line)
  .join('\n');

  return output;
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast dashboard
`, {
  description: 'Custom displays.'
});

/**
 * Define script
 */

async function dashboard() {
  showHelp(cli);

  // const text = 'The quick brown fox \njumps over the lazy dog and something else.';
  const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  const fancyDate = figlet.textSync(date, { font: 'Small' });

  // Calculate padding X by splitting total columns in half.
  // Then remove 1 column to account for left and right borders.
  // Then calculate the maximum width of the content divided by 2.
  const maxTextLength = widestLine(fancyDate);
  const paddingX = calcPaddingX(cols, maxTextLength);
  const output = createPanel(fancyDate, {
    padding: { left: paddingX, right: paddingX }
  });

  // TODO render dateTime app.
  // joinScenes([...])
  // TODO render weather app.
  // TODO render tasks app.
  // TODO render qotd app.
  // TODO render os app.

  console.log('');
  console.log(output);
  console.log({ cols, rows });
  console.log({ maxTextLength, paddingX });
  console.log('');
}

/**
 * Export script
 */

module.exports = dashboard;

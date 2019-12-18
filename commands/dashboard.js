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
const datetime = require('./datetime');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const { columns: cols, rows } = termSize();

/**
 * Define helpers
 */

function calcPaddingX(cols, maxTextLength) {
  return Math.floor(cols / 2 - 1 - maxTextLength / 2);
}

function createPanel(content, options = {}) {
  // Check if paddingX is negative;

  const output = boxen(content, options);

  return output;
}

function joinPanels(panels) {
  let output = [];

  // Split panels by newline.
  panels = panels.map(panel => panel.split('\n'));

  // Ensure panels have same number of lines.
  const maxLength = panels.reduce((max, x) => max > x.length ? max : x.length, 0);
  panels = panels.filter(panel => panel.length === maxLength);

  // Join parallel lines together.
  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < panels.length; j++) {
      output[i] = output[i] || '';
      output[i] += panels[j][i];
    }
    output[i] += '\n';
  }

  return output.join('');
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
  const maxTextLength = widestLine(date);
  const paddingX = calcPaddingX(Math.floor(cols / 3), maxTextLength);
  // const panel = createPanel(date, {
  //   padding: { left: paddingX, right: paddingX }
  // });

  // const output = joinPanels([panel, panel])
  // const output = joinPanels([panel, panel, panel])

  // Render dateTime app.
  datetime();

  // TODO render weather app.
  // weather();

  // TODO render tasks app.
  // tasks();

  // TODO render qotd app.
  // qotd();

  // TODO render os app.
  // os();
}

/**
 * Export script
 */

module.exports = dashboard;

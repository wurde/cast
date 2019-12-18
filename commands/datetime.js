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
const isMainCommand = require('../helpers/isMainCommand');

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

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast datetime
`, {
  description: 'Print date and time.'
})

/**
 * Define script
 */

function datetime() {
  showHelp(cli);

  const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  const fancyDate = figlet.textSync(date, { font: 'Small' });

  const simplePaddingX = calcPaddingX(cols, widestLine(date));
  const fancyPaddingX = calcPaddingX(cols, widestLine(fancyDate));

  const content = fancyPaddingX < 0 ? date : fancyDate;
  const paddingX = fancyPaddingX < 0 ? simplePaddingX : fancyPaddingX;
  const output = boxen(content, { padding: { left: paddingX, right: paddingX }})

  if (isMainCommand(module)) {
    console.log('');
    console.log(output);
    console.log('');
  } else {
    return content;
  }
}

/**
 * Export script
 */

module.exports = datetime;

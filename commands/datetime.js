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
  showHelp(cli)
  console.log('datetime');
}

/**
 * Export script
 */

module.exports = datetime

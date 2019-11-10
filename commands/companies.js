'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const showHelp = require('../helpers/showHelp');
const scrape = require('./scrape');

/**
 * Constants
 */

const REF_URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies';

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast companies
`, {
  description: 'Lookup table for companies in the S&P 500.'
})

/**
 * Define script
 */

async function companies() {
  showHelp(cli);

  const table = await scrape(REF_URL, 'table.wikitable');

  console.log('table', table);
}

/**
 * Export script
 */

module.exports = companies

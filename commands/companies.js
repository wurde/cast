'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const cheerio = require('cheerio');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const REF_URL = 'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies';
const CACHE_PATH = path.join(process.env.HOME, '.companies.html')

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

  fs.writeFileSync(CACHE_PATH, table, { encoding: 'utf8' });

  // const companyRefs = [];

  // const $ = cheerio.load(table);

  // $('table > tbody > tr').each((i, element) => {
  //   console.log(element)
  //   console.log('')
  // })

  // console.log('companyRefs', companyRefs);
}

/**
 * Export script
 */

module.exports = companies

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
const lastModified = require('../helpers/lastModified');

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

  let fetchResults = true;
  if (fs.existsSync(CACHE_PATH)) {
    const ms = lastModified(CACHE_PATH);
    const month = 1000 * 60 * 60 * 24 * 30;
    if (ms < month) {
      fetchResults = false;
    }
  }

  let table;
  if (fetchResults) {
    table = await scrape(REF_URL, 'table.wikitable');
    fs.writeFileSync(CACHE_PATH, table, { encoding: 'utf8' });
  } else {
    table = fs.readFileSync(CACHE_PATH, { encoding: 'utf8' });
  }
  console.log('table', table);

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

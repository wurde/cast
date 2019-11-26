'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
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
    $ cast companies [FILTER]

  Options:
    --json   Return information in JSON format.
`, {
  description: 'Lookup table for companies in the S&P 500.',
  flags: {
    json: {
      type: 'boolean',
    }
  }
})

/**
 * Define script
 */

async function companies() {
  showHelp(cli);

  const filter = cli.input.slice(1).join(' ');

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
    table = await scrape(REF_URL, { selector: 'table#constituents' });
    fs.writeFileSync(CACHE_PATH, table, { encoding: 'utf8' });
  } else {
    table = fs.readFileSync(CACHE_PATH, { encoding: 'utf8' });
  }

  let companyRefs = [];
  let $ = cheerio.load(table);

  $('table tbody tr').each((i, element) => {
    if (i === 0) return;
    companyRefs.push($(element).html().trim());
  })

  companyRefs = companyRefs.map(companyRef => {
    const data = {
      "symbol": null,
      "name": null,
      "sector": null,
      "subSector": null,
      "headquarters": null,
      "dateAdded": null,
      "cik": null,
      "founded": null,
    }

    $('td', companyRef).each((i, col) => {
      if (i === 0) data["symbol"] = $(col).text().trim();
      if (i === 1) data["name"] = $(col).text().trim();
      if (i === 3) data["sector"] = $(col).text().trim();
      if (i === 4) data["subSector"] = $(col).text().trim();
      if (i === 5) data["headquarters"] = $(col).text().trim();
      if (i === 6) data["dateAdded"] = $(col).text().trim();
      if (i === 7) data["cik"] = $(col).text().trim();
      if (i === 8) data["founded"] = $(col).text().trim();
    })

    return data;
  });

  if (filter.length > 0) {
    companyRefs = companyRefs.filter(c => c['name'].match(filter));
  }

  if (arguments.length === 0) {
    if (cli.flags.json) {
      console.log(JSON.stringify(companyRefs));
    } else {
      console.log(chalk.white.bold('\nCompanies:\n'))
      companyRefs.forEach(c => {
        console.log(`  Symbol: ${chalk.green.bold(c['symbol'])}`);
        console.log(`  Name: ${chalk.green.bold(c['name'])}`);
        console.log(`  Sector: ${chalk.green.bold(c['sector'])}`);
        console.log(`  Sub-Sector: ${chalk.green.bold(c['subSector'])}`);
        if (c['dateAdded']) console.log(`  Date Added: ${chalk.green.bold(c['dateAdded'])}`);
        console.log(`  CIK: ${chalk.green.bold(c['cik'])}`);
        if (c['founded']) console.log(`  Founded: ${chalk.green.bold(c['founded'])}`);
        console.log('')
      })
    }
  }

  return companyRefs
}

/**
 * Export script
 */

module.exports = companies

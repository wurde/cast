'use strict'

/**
 * Dependencies
 */

const https = require('https')
const querystring = require('querystring')
const meow = require('meow')
const figlet = require('figlet')
const cheerio = require('cheerio')
const chalk = require('chalk')
const html_to_text = require('html-to-text')
const connectivity = require('connectivity')

/**
 * Constants
 */

const API_URL = 'https://en.wikiquote.org/w/api.php'
const AUTHORS = [
  'Albert Einstein',
  'Steve Jobs',
  'Walt Disney',
]

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast qotd
`)

/**
 * Define helpers
 */

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function quote_api_request(obj) {
  return new Promise((resolve, reject) => {
    const q = querystring.stringify(obj)

    const request = https.get(`${API_URL}?${q}`, res => {
      if (res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error('Page load error: ' + res.statusCode))
      }

      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(JSON.parse(data)))
    })

    request.on('error', err => reject(err))
  })
}

function checkConnectivity() {
  return new Promise((resolve, reject) => {
    connectivity(online => online ? resolve(true) : resolve(false))
  })
}

/**
 * Define script
 */

async function qotd() {
  if (cli.flags.h) cli.showHelp()

  const is_connected = await checkConnectivity()
  if (is_connected === false) {
    console.error(chalk.red('Error: There is no Internet connection.'))
    process.exit(1)
  }

  const author = AUTHORS[randomInteger(0, AUTHORS.length - 1)]

  /**
   * Get the page ID for a given author.
   */

  const page_data = await quote_api_request({
    format: 'json',
    action: 'query',
    redirects: '',
    titles: author
  })

  const pages = Object.keys(page_data.query.pages)
    .map(id => Number(id))
    .filter(id => id > 0)

  if (pages.length === 0) {
    console.error(chalk.red(`Error: No quotes for author '${author}'.`))
    process.exit(1)
  }

  /**
   * Get sections for a given page.
   */

  const section_data = await quote_api_request({
    format: 'json',
    action: 'parse',
    prop: 'sections',
    pageid: pages[0]
  })

  let sections = section_data.parse.sections
  const sectionID = randomInteger(1, sections.length - 1)

  /**
   * Get quotes for a given section.
   */

  const quotes_data = await quote_api_request({
    format: 'json',
    action: 'parse',
    noimages: '',
    pageid: pages[0],
    section: sectionID
  })

  const quotes = []
  const text = quotes_data.parse.text["*"]
  const $ = cheerio.load(text)

  $('.mw-parser-output > ul li').each((i, element) => {
    let quote = html_to_text.fromString($(element).html(), {
      wordwrap: null
    })
    quote = quote.replace(/\[.*?\]/g, '')
    quote = quote.replace(/\s+/, ' ')
    quotes.push(quote)
  })

  const display_quote = quotes[randomInteger(0, quotes.length - 1)]

  figlet.text("Quote of the day", {
    font: 'Small'
  }, (err, data) => {
    console.log(data, '\n')
    console.log(chalk.bold(display_quote))
    console.log(chalk.bold(`- ${author}`))
  })
}

/**
 * Export script
 */

module.exports = qotd

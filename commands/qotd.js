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
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const API_URL = 'https://en.wikiquote.org/w/api.php'

/**
 * Locals
 */

let authors = [
  'Albert Einstein',
  'Albert Hofmann',
  'Aldous Huxley',
  'Bertrand Russell',
  'Douglas Adams',
  'Leo Tolstoy',
  'Seth Godin',
  'Timothy Ferriss',
  'Steve Jobs',
  'Walt Disney',
]

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast qotd [AUTHOR,...AUTHOR]
`, {
  description: 'Quote of the day.'
})

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
  showHelp(cli)

  if (cli.input.length > 1) {
    authors = cli.input.slice(1, cli.input.length).join(' ').split(',')
  }

  const is_connected = await checkConnectivity()
  if (is_connected === false) {
    console.error(chalk.red('Error: There is no Internet connection.'))
    process.exit(1)
  }

  const author = authors[randomInteger(0, authors.length - 1)]

  /**
   * Get the page ID for a given author. If multiple then choose the first.
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
   * Filter for 1.x sections. If no 1.x sections exists, return section 1.
   */

  const section_data = await quote_api_request({
    format: 'json',
    action: 'parse',
    prop: 'sections',
    pageid: pages[0]
  })

  let sections = section_data.parse.sections.filter(s => s.number.match(/1\.\d/))
  if (sections.length === 0) {
    sections = section_data.parse.sections.filter(s => s.number === '1')
  }
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

  $('.mw-parser-output > ul > li').each((i, element) => {
    let quote = html_to_text.fromString($(element).html(), {
      wordwrap: null
    })
    quote = quote.replace(/\[.*?\]/g, '')
    quote = quote.replace(/\s+/, ' ')
    if (!quote.match(/^As quoted in/)) quotes.push(quote)
  })
  const display_quote = quotes[randomInteger(0, quotes.length - 1)]

  figlet.text("Quote of the day", {
    font: 'Small'
  }, (err, data) => {
    console.log(data, '\n')
    console.log(chalk.bold(display_quote))
    console.log(
      chalk.bold(`- ${author}, `) +
      html_to_text.fromString(section_data.parse.sections[sectionID - 1].line, {
        wordwrap: null
      })
    )
  })
}

/**
 * Export script
 */

module.exports = qotd

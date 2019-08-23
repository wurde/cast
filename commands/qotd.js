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

  let pageIDs = Object.keys(page_data.query.pages)
  pageIDs = pageIDs.filter(id => Number(id) > 0)

  if (pageIDs.length === 0) {
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
    pageid: pageIDs[0]
  })
  console.log('Section Data: ', section_data)

  let sections = section_data.parse.sections
  console.log('sections', sections)

  // TODO random section
  const sectionID = randomInteger(1,4)
  console.log('sectionID', sectionID)

  /**
   * Get quotes for a given section.
   */

  const quotes_data = await quote_api_request({
    format: 'json',
    action: 'parse',
    noimages: '',
    pageid: pageIDs[0],
    section: sectionID
  })
  console.log('Quotes Data: ', quotes_data)

  // const text = quotes_data.parse.text["*"]
  // const $ = cheerio.load(text)
  // let quote = $('b').html()
  //
  // quote = html_to_text.fromString(quote, { wordwrap: 300 })
  // quote = quote.replace(/\[.*?\]/g, '')
  // quote = quote.replace(/\s+/, ' ')
  //
  // figlet.text("Quote of the day", {
  //   font: 'Small'
  // }, (err, data) => {
  //   console.log(data, '\n')
  //   console.log(chalk.bold(quote))
  //   console.log(chalk.bold(`- ${author}`))
  // })
}

/**
 * Export script
 */

module.exports = qotd

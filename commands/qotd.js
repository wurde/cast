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

/**
 * Define script
 */

async function qotd() {
  if (cli.flags.h) cli.showHelp()

  const author = AUTHORS[randomInteger(0, AUTHORS.length - 1)]

  /**
   * Get the page ID for a given author.
   */

  let page_data = await quote_api_request({
    format: 'json',
    action: 'query',
    redirects: '',
    titles: author
  })
  console.log('Page Data: ', page_data)

  let pageIDs = Object.keys(page_data.query.pages)
  pageIDs = pageIDs.filter(id => Number(id) > 0)

  if (pageIDs.length === 0) {
    console.error(chalk.red(`Error: No quotes found for author '${author}'.`))
    process.exit(1)
  }

  console.log('pageIDs', pageIDs)

  // TEMP
  //     if (pageIDs.length > 0) {
  //       /**
  //        * Get sections for a given page.
  //        */
  //
  //       https.get(`${API_URL}?${querystring.stringify({
  //         format: 'json',
  //         action: 'parse',
  //         prop: 'sections',
  //         pageid: pageIDs[0]
  //       })}`, res => {
  //         let data = ''
  //
  //         res.on('data', (chunk) => {
  //           data += chunk
  //         })
  //
  //         res.on('end', () => {
  //           data = JSON.parse(data)
  //
  //           let sections = data.parse.sections
  //
  //           // TODO random section
  //           const sectionID = randomInteger(1,4)
  //
  //           /**
  //            * Get quotes for a given section.
  //            */
  //
  //           https.get(`${API_URL}?${querystring.stringify({
  //             format: 'json',
  //             action: 'parse',
  //             noimages: '',
  //             pageid: pageIDs[0],
  //             section: sectionID
  //           })}`, res => {
  //             let data = ''
  //
  //             res.on('data', (chunk) => {
  //               data += chunk
  //             })
  //
  //             res.on('end', () => {
  //               data = JSON.parse(data)
  //
  //               const text = data.parse.text["*"]
  //               const $ = cheerio.load(text)
  //               let quote = $('b').html()
  //
  //               quote = html_to_text.fromString(quote, { wordwrap: 300 })
  //               quote = quote.replace(/\[.*?\]/g, '')
  //               quote = quote.replace(/\s+/, ' ')
  //
  //               figlet.text("Quote of the day", {
  //                 font: 'Small'
  //               }, (err, data) => {
  //                 console.log(data, '\n')
  //                 console.log(chalk.bold(quote))
  //                 console.log(chalk.bold(`- ${author}`))
  //               })
  //             })
  //           })
  //         })
  //       })
  //     } else {
  //       console.error('No quotes found')
  //     }
  //   })
  // })
}

/**
 * Export script
 */

module.exports = qotd

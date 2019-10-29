'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const dl = require('./dl')
const scrape = require('./scrape')
const showHelp = require('../helpers/showHelp')
const sleep = require('../helpers/sleep')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google-images QUERY
`, {
  description: 'Search and download Google Images.'
})

 /**
 * Define script
 */

async function google_images(query=null) {
  showHelp(cli, [(!query && cli.input.length < 2)])

  if (!query) {
    query = cli.input[1]
  }

  try {
    const targetUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`

    // Scrape images from search.
    const result = await scrape({
      url: targetUrl,
      selector: 'div#search img'
    })

    // Parse all image URLs on page.
    const imageUrls = result.reduce((urls, imageHtml) => {
      const match = imageHtml.match(/"(https.*?)"/)
      if (match) urls.push(match[1])
      return urls
    }, [])

    // Download all images.
    for (let i = 0; i < imageUrls.length; i++) {
      dl(imageUrls[i])
      await sleep(200)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Export script
 */

module.exports = google_images

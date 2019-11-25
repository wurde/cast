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
    $ cast google-images [OPTIONS] QUERY
  
  Options
    --size SIZE        Filter results by image size.
                       Large, Medium, Icon, Larger than 2MP,8MP,40MP,70MP.
    --color COLOR      Filter results by image size.
                       Black and white, red, orange, yellow, green, purple, pink,
                       grey, white, black.
    --time TIME        Filter results by time.
                       Past 24 hours, past week, past month, past year.
    --type TYPE        Filter results by type.
                       Face, photo, clip art, line drawing, animated.
    --region REGION    Filter results by region.
                       United Kingdom, United States, Uruguay, ...
    --format FORMAT    Filter results by file format.
                       JPG, PNG, GIF, BMP, SVG, ICO.
`, {
  description: 'Search and download Google Images.'
})

 /**
 * Define script
 */

async function google_images(query=null, options={}) {
  showHelp(cli, [(!query && cli.input.length < 2)])

  query = query || cli.input[1];

  try {
    const targetUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`
    const result = await scrape(targetUrl, 'div#search img')

    // Parse all image URLs on page.
    const imageUrls = result.reduce((urls, imageHtml) => {
      const match = imageHtml.match(/"(https.*?)"/)
      if (match) urls.push(match[1])
      return urls
    }, [])

    // Download all images.
    for (let i = 0; i < imageUrls.length; i++) {
      dl(imageUrls[i], `${i}`)
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

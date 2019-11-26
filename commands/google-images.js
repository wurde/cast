'use strict'

/**
 * Dependencies
 */

const camelcase = require('camelcase');
const meow = require('meow');
const download = require('./dl');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google-images [OPTIONS] QUERY
  
  Options
    --min-count COUNT    Minimum number of images to download.
    --size SIZE          Filter results by image size.
                           large, medium, icon, 2mp, 8mp, 40mp, 70mp.
    --color COLOR        Filter results by image size.
                           red, blue, orange, yellow, green, purple, pink,
                           grey, white, black.
    --time TIME          Filter results by time.
                           day, week, month, year.
    --type TYPE          Filter results by type.
                           face, photo, clipart, lineart, animated.
    --format FORMAT      Filter results by file format.
                           jpg, png, gif, bmp, svg, ico.
`, {
  description: 'Search and download Google Images.',
  flags: {
    minCount:  { type: 'integer' },
    size:   { type: 'string' },
    color:  { type: 'string' },
    time:   { type: 'string' },
    type:   { type: 'string' },
    region: { type: 'string' },
    format: { type: 'string' }
  }
})

 /**
 * Define script
 */

async function google_images(query = null, options = {}) {
  showHelp(cli, [(!query && cli.input.length < 2)])

  query = query || cli.input.slice(1);
  const minCount = options.minCount || cli.flags.minCount;
  const label = options.label || camelcase(query, { pascalCase: true });
  const size = options.size || cli.flags.size;
  const color = options.color || cli.flags.color;
  const time = options.time || cli.flags.time;
  const type = options.type || cli.flags.type;
  const region = options.region || cli.flags.region;
  const format = options.format || cli.flags.format;

  const browser = await launchBrowser({
    headless: false,
    delay: 400,
    timeout: 0,
    defaultViewport: {
      width: 1024,
      height: 800
    }
  });

  try {
    let imageUrls = [];
    let targetUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}&tbs=`;

    if (size) {
      if (size.match(/large/i) || size.match('l')) {
        targetUrl += 'isz:l,';
      } else if (size.match(/medium/i) || size.match('m')) {
        targetUrl += 'isz:m,';
      } else if (size.match(/icon/i) || size.match('i')) {
        targetUrl += 'isz:i,';
      } else {
        targetUrl += 'isz:l,';
      }
    }

    if (color) {
      if (color.match(/red/i)) {
        targetUrl += 'ic:specific,isc:red,';
      } else if (color.match(/blue/i)) {
        targetUrl += 'ic:specific,isc:blue,';
      } else if (color.match(/orange/i)) {
        targetUrl += 'ic:specific,isc:orange,';
      } else if (color.match(/yellow/i)) {
        targetUrl += 'ic:specific,isc:yellow,';
      } else if (color.match(/green/i)) {
        targetUrl += 'ic:specific,isc:green,';
      } else if (color.match(/purple/i)) {
        targetUrl += 'ic:specific,isc:purple,';
      } else if (color.match(/pink/i)) {
        targetUrl += 'ic:specific,isc:pink,';
      } else if (color.match(/grey/i)) {
        targetUrl += 'ic:specific,isc:grey,';
      } else if (color.match(/white/i)) {
        targetUrl += 'ic:specific,isc:white,';
      } else if (color.match(/black/i)) {
        targetUrl += 'ic:specific,isc:black,';
      }
    }

    if (time) {
      if (time.match(/day/i)) {
        targetUrl += 'qdr:d,';
      } else if (time.match(/week/i)) {
        targetUrl += 'qdr:w,';
      } else if (time.match(/month/i)) {
        targetUrl += 'qdr:m,';
      } else if (time.match(/year/i)) {
        targetUrl += 'qdr:y,';
      }
    }

    if (type) {
      if (type.match(/face/i)) {
        targetUrl += 'itp:face,';
      } else if (type.match(/photo/i)) {
        targetUrl += 'itp:photo,';
      } else if (type.match(/clipart/i)) {
        targetUrl += 'itp:clipart,';
      } else if (type.match(/lineart/i)) {
        targetUrl += 'itp:lineart,';
      } else if (type.match(/animated/i)) {
        targetUrl += 'itp:animated,';
      }
    }

    if (format) {
      if (format.match(/jpg/i)) {
        targetUrl += 'ift:jpg,';
      } else if (format.match(/png/i)) {
        targetUrl += 'ift:png,';
      } else if (format.match(/gif/i)) {
        targetUrl += 'ift:gif,';
      } else if (format.match(/bmp/i)) {
        targetUrl += 'ift:bmp,';
      } else if (format.match(/svg/i)) {
        targetUrl += 'ift:svg,';
      } else if (format.match(/ico/i)) {
        targetUrl += 'ift:ico,';
      }
    }

    const result = await scrape(targetUrl, {
      selector: 'div#search img',
      infiniteScroll: true,
      minCount,
      browser
    });
    browser.close();

    // Parse all image URLs on page.
    imageUrls = imageUrls.concat(
      result.reduce((urls, imageHtml) => {
        const match = imageHtml.match(/"(https.*?images.*?)"/);
        if (match) urls.push(match[1]);
        return urls;
      }, [])
    );

    // Download all images.
    for (let i = 0; i < imageUrls.length; i++) {
      download(imageUrls[i], `${label}-${i}`)
      await sleep(200)
    }
  } catch (err) {
    console.error(err);
  } finally {
    // Ensure browser is closed.
    if (browser) browser.close();
  }
}

/**
 * Export script
 */

module.exports = google_images

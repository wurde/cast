'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const camelcase = require('camelcase');
const download = require('./dl');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Constants
 */

const AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
const URL = 'https://www.google.com';

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google-images [OPTIONS] QUERY
  
  Options
    -c, --count COUNT    Minimum number of images to download.
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
    count:  { type: 'integer', alias: 'c' },
    size:   { type: 'string', alias: 's' },
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
  const count = options.count || cli.flags.count;
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
    let link = `${URL}/search?tbm=isch&q=${encodeURIComponent(query)}&tbs=`;

    if (size) {
      if (size.match(/large/i) || size.match('l')) {
        link += 'isz:l,';
      } else if (size.match(/medium/i) || size.match('m')) {
        link += 'isz:m,';
      } else if (size.match(/icon/i) || size.match('i')) {
        link += 'isz:i,';
      } else {
        link += 'isz:l,';
      }
    }

    if (color) {
      if (color.match(/red/i)) {
        link += 'ic:specific,isc:red,';
      } else if (color.match(/blue/i)) {
        link += 'ic:specific,isc:blue,';
      } else if (color.match(/orange/i)) {
        link += 'ic:specific,isc:orange,';
      } else if (color.match(/yellow/i)) {
        link += 'ic:specific,isc:yellow,';
      } else if (color.match(/green/i)) {
        link += 'ic:specific,isc:green,';
      } else if (color.match(/purple/i)) {
        link += 'ic:specific,isc:purple,';
      } else if (color.match(/pink/i)) {
        link += 'ic:specific,isc:pink,';
      } else if (color.match(/grey/i)) {
        link += 'ic:specific,isc:grey,';
      } else if (color.match(/white/i)) {
        link += 'ic:specific,isc:white,';
      } else if (color.match(/black/i)) {
        link += 'ic:specific,isc:black,';
      }
    }

    if (time) {
      if (time.match(/day/i)) {
        link += 'qdr:d,';
      } else if (time.match(/week/i)) {
        link += 'qdr:w,';
      } else if (time.match(/month/i)) {
        link += 'qdr:m,';
      } else if (time.match(/year/i)) {
        link += 'qdr:y,';
      }
    }

    if (type) {
      if (type.match(/face/i)) {
        link += 'itp:face,';
      } else if (type.match(/photo/i)) {
        link += 'itp:photo,';
      } else if (type.match(/clipart/i)) {
        link += 'itp:clipart,';
      } else if (type.match(/lineart/i)) {
        link += 'itp:lineart,';
      } else if (type.match(/animated/i)) {
        link += 'itp:animated,';
      }
    }

    if (format) {
      if (format.match(/jpg/i)) {
        link += 'ift:jpg,';
      } else if (format.match(/png/i)) {
        link += 'ift:png,';
      } else if (format.match(/gif/i)) {
        link += 'ift:gif,';
      } else if (format.match(/bmp/i)) {
        link += 'ift:bmp,';
      } else if (format.match(/svg/i)) {
        link += 'ift:svg,';
      } else if (format.match(/ico/i)) {
        link += 'ift:ico,';
      }
    }

    const result = await scrape(link, {
      selector: 'div#search img',
      infiniteScroll: true,
      agent: AGENT,
      count,
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

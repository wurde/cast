'use strict'

/**
 * Dependencies
 */

const url = require('url');
const path = require('path');
const meow = require('meow');
const camelcase = require('camelcase');
const objectHash = require('object-hash');
const download = require('./dl');
const scrape = require('./scrape');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');
const rand = require('../helpers/rand');
const launchBrowser = require('../helpers/launchBrowser');

/**
 * Constants
 */

const AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';
const URL = 'https://www.google.com';
const IMG_COUNT = 100;

/**
 * Define helpers
 */

function buildLink(query, size, color, time, type, format) {
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

  return link;
}

async function scrollToPageBottom(page) {
  try {
    // Get current scrollHeight.
    const currentScrollHeight = await page.evaluate(() => {
      return document.querySelector('html').scrollHeight
    });

    // Scroll to the bottom of the page.
    await page.evaluate(() => {
      window.scrollTo(0, document.querySelector('html').scrollHeight)
    });

    // Wait for scroll height to increase.
    await page.waitForFunction(
      `document.querySelector('html').scrollHeight > ${currentScrollHeight}`,
      { timeout: 10000 }
    );

    // Wait for 2 seconds.
    await page.waitFor(2000);

    // Get current scrollHeight.
    const totalScrollHeight = await page.evaluate(() => {
      return document.querySelector('html').scrollHeight;
    });

    // Return true if page is still scrollable.
    return totalScrollHeight > currentScrollHeight;
  } catch (err) {
    return false;
  }
};

async function scrollToPageTop(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
}

async function loadMoreImages(page) {
  await scrollToPageBottom(page);
  await page.waitFor(rand(1300, 2000));
  await scrollToPageTop(page);
  await page.waitFor(rand(1300, 2000));
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast google-images [OPTIONS] QUERY
  
  Options
    -c, --count COUNT    Minimum number of images to download. (Default 100)
    -s, --size SIZE      Filter results by image size.
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

  query = query || cli.input.slice(1).join(' ');
  const output = options.output || process.cwd();
  const count = options.count || cli.flags.count || IMG_COUNT;
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
    const cssThumbnailDiv = i => `div#search div[data-ri="${i}"]`;
    const cssThumbnail = 'img';
    const cssFirstImg = 'a[tabindex="0"] img.irc_mi';
    const link = buildLink(query, size, color, time, type, region);

    const page = await browser.newPage();
    await page.setUserAgent(AGENT);

    await page.goto(link, { waitUntil: 'domcontentloaded' });
    await page.waitFor(rand(1300, 2000));

    let div;
    let thumb;
    let img;
    let src;
    for (let i = 0; i <= count; i++) {
      try {
        if (i % 50 === 0) await loadMoreImages(page);

        div = await page.$(cssThumbnailDiv(i));
        if (!div) continue;

        thumb = await div.$(cssThumbnail);
        if (!await thumb.isIntersectingViewport()) {
          await div.evaluate(node => node.remove());
          continue;
        }
        await thumb.click({ delay: rand(100, 200) });
        await page.waitFor(rand(150, 200));

        img = await page.$(cssFirstImg);
        src = await img.evaluate(node => node.src);

        const imgUrl = url.parse(src);
        if (!imgUrl.pathname) {
          await div.evaluate(node => node.remove());
          continue;
        }
        const hash = objectHash(imgUrl);
        const ext = path.extname(imgUrl.pathname);
        const file = `${hash}${ext}`;
        const out = path.join(output, file);
        await download(src, out);

        await page.keyboard.press('Escape');
        await div.evaluate(node => node.remove());
        await page.waitFor(rand(300, 600));
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    if (browser) browser.close();
  }
}

/**
 * Export script
 */

module.exports = google_images

'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const Parser = require('rss-parser');
const Sequelize = require('sequelize');
const rssFeeds = require('../data/rss_feeds.json');
const showHelp = require('../helpers/showHelp');
const Database = require('../helpers/Database');

/**
 * Constants
 */

const parser = new Parser({
  timeout: 5000, // 5 seconds
  headers: {
    'User-Agent': `Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36`
  }
});
// Some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const DB_PATH = path.join(process.env.HOME, '.rss.sqlite3');
const QUERIES = {
  insertFeed: (title, link) => `
    INSERT INTO feeds (title, link) VALUES ('${title}', '${link}');
  `,
  selectFeeds: () => `
    SELECT * FROM feeds;
  `,
  createTableFeeds: () => `
    CREATE TABLE IF NOT EXISTS feeds (
      id integer PRIMARY KEY,
      title text,
      link text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
  `,
  createTableArticles: () => `
    CREATE TABLE IF NOT EXISTS articles (
      id integer PRIMARY KEY,
      article_id integer ,
      title text,
      link text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (article_id) REFERENCES articles (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
    );
  `,
  hasTable: tblName => `
    SELECT name
    FROM sqlite_master
    WHERE type='table'
    AND name='${tblName}';
  `
};

/**
 * Define helpers
 */

async function createTablesIfMissing(db) {
  const [tblFeedsSelect] = await db.exec('hasTable', ['feeds']);
  if (tblFeedsSelect.length === 0) await db.exec('createTableFeeds');

  const [tblArticlesSelect] = await db.exec('hasTable', ['articles']);
  if (tblArticlesSelect.length === 0)
    await db.exec('createTableArticles');
}

async function seedEmptyFeedsTable(db) {
  // Check if feeds table is empty;
  const [feedsSelect] = await db.exec('selectFeeds');

  if (feedsSelect.length === 0) {
    for (let i = 0; i < rssFeeds.length; i++) {
      try {
        // Check if feed is still available.
        const feed = await parser.parseURL(rssFeeds[i].link);
        if (feed && feed.title && feed.link)
          await db.exec('insertFeed', [feed.title.trim(), feed.link.trim()]);
      } catch (e) {
        console.error(e)
      }
    }
  }
}

async function addFeed(link) {
  try {
    // Check if feed is available.
    const feed = await parser.parseURL(link);
    if (feed && feed.title && feed.link)
      await db.exec('insertFeed', [feed.title.trim(), feed.link.trim()]);
  } catch (e) {
    console.error(e)
  }
}

function parseCommand(flags, cmdDefault) {
  const cmds = Object.keys(flags);

  if (cmds.length === 0) {
    return cmdDefault;
  } else {
    return cmds.shift();
  }
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast rss

  Options:
    --add LINK       Add a new RSS feed.
    --remove LINK    Add a new RSS feed.
`, {
  description: 'RSS feeds management utility.',
  flags: {
    add: { type: 'string' },
    remove: { type: 'string' },
  }
})

/**
 * Define script
 */

async function rss(command = null) {
  showHelp(cli);

  const db = new Database(DB_PATH, QUERIES);
  await createTablesIfMissing(db);

  command = command || parseCommand(cli.flags, 'list');

  try {
    // Seed feeds table.
    await seedEmptyFeedsTable(db);

    if (command === 'add') {
      await addFeed(cli.flags.add);
    } else if (command === 'remove') {
      // await removeFeed(cli.flags.remove);
    } else if (command === 'subscribe') {
      // await subscribeToFeed(cli.flags.subscribe);
    } else if (command === 'unsubscribe') {
      // await unsubscribeToFeed(cli.flags.unsubscribe);
    }

    // TODO print all feeds (show subscriptions top).
    // TODO fetch articles from a specific feed.
    // TODO allow filtering articles by keyword.

    // TODO default - fetch and print most recent articles.
  } catch (err) {
    console.error(err);
  } finally {
    await db.close();
  }
};

/**
 * Export script
 */

module.exports = rss;

'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
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
  subscribeFeed: () => `
    UPDATE feeds
    SET subscribed_at = CURRENT_TIMESTAMP
    WHERE link LIKE $1
    OR title LIKE $1;
  `,
  unsubscribeFeed: () => `
    UPDATE feeds
    SET subscribed_at = null
    WHERE link LIKE $1
    OR title LIKE $1;
  `,
  insertFeed: () => `
    INSERT INTO feeds (title, link) VALUES ($1, $2);
  `,
  deleteFeed: () => `
    DELETE FROM feeds WHERE link LIKE $1;
  `,
  selectFeeds: () => `
    SELECT * FROM feeds;
  `,
  createTableFeeds: () => `
    CREATE TABLE IF NOT EXISTS feeds (
      id integer PRIMARY KEY,
      title text,
      link text,
      subscribed_at timestamp,
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
  hasTable: () => `
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    AND name = $1;
  `
};

/**
 * Define helpers
 */

async function createTablesIfMissing(db) {
  const [tblFeedsSelect] = await db.exec('hasTable', null, {
    bind: ['feeds']
  });
  if (tblFeedsSelect.length === 0) await db.exec('createTableFeeds');

  const [tblArticlesSelect] = await db.exec('hasTable', null, {
    bind: ['articles']
  });
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
          await db.exec('insertFeed', null, {
            bind: [feed.title.trim(), feed.link.trim()]
          });
      } catch (e) {
        console.error(e)
      }
    }
  }
}

async function listFeeds(db) {
  try {
    let [feedsSelect] = await db.exec('selectFeeds');
    feedsSelect.sort((a, b) => a.subscribed_at ? -1 : 0);

    console.log('');
    for (let i = 0; i < feedsSelect.length; i++) {
      const feed = feedsSelect[i];
      const sub = feed.subscribed_at ? '[*]' : '[ ]';

      console.log(`  ${sub} ` + chalk.green.bold(feed.title));
      console.log('      ' + chalk.yellow.bold(feed.link));
      console.log('');
    }
  } catch (e) {
    console.error(e);
  }
}

async function addFeed(db, link) {
  try {
    // Check if feed is available.
    const feed = await parser.parseURL(link);
    if (feed && feed.title && feed.link)
      await db.exec('insertFeed', [feed.title.trim(), feed.link.trim()]);
  } catch (e) {
    console.error(e)
  }
}

async function removeFeed(db, link) {
  try {
    await db.exec('deleteFeed', null, {
      bind: [`%${link}%`]
    });
  } catch (e) {
    console.error(e);
  }
}

async function subscribeToFeed(db, link) {
  try {
    await db.exec('subscribeFeed', null, { bind: [`%${link}%`] });
  } catch (e) {
    console.error(e);
  }
}

async function unsubscribeToFeed(db, link) {
  try {
    await db.exec('subscribeFeed', [link]);
  } catch (e) {
    console.error(e);
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
    --add LINK           Add a new RSS feed.
    --remove LINK        Remove an RSS feed.
    --subscribe LINK     Subscribe to an RSS feed.
    --unsubscribe LINK   Unsubscribe to an RSS feed.
`, {
  description: 'RSS feeds management utility.',
  flags: {
    add: { type: 'string' },
    remove: { type: 'string' },
    subscribe: { type: 'string' },
    unsubscribe: { type: 'string' },
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

    if (command === 'list') {
      await listFeeds(db);
    } else if (command === 'add') {
      await addFeed(db, cli.flags.add);
    } else if (command === 'remove') {
      await removeFeed(db, cli.flags.remove);
    } else if (command === 'subscribe') {
      await subscribeToFeed(db, cli.flags.subscribe);
    } else if (command === 'unsubscribe') {
      await unsubscribeToFeed(db, cli.flags.unsubscribe);
    }

    // TODO fetch articles from a specific feed.
    // TODO default - fetch and print most recent articles.
    // TODO allow filtering articles by keyword.
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

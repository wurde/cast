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
const HOUR = 1000 * 60 * 60;
// Some RSS feeds can't be loaded in the browser due to CORS security.
// To get around this, you can use a proxy.
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const DB_PATH = path.join(process.env.HOME, '.rss.sqlite3');
const QUERIES = {
  updateFeedFetchTimestamp: () => `
    UPDATE feeds
    SET last_fetch_at = CURRENT_TIMESTAMP
    WHERE link LIKE $1;
  `,
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
  insertArticle: () => `
    INSERT OR IGNORE INTO articles (feed_id, title, link) VALUES ($1, $2, $3);
  `,
  selectArticles: () => `
    SELECT * FROM articles
    WHERE created_at > date('now','-2 hours')
    ORDER BY created_at DESC;
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
      last_fetch_at timestamp,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP
    );
  `,
  createTableArticles: () => `
    CREATE TABLE IF NOT EXISTS articles (
      id integer PRIMARY KEY,
      link text UNIQUE,
      feed_id integer,
      title text,
      created_at timestamp DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (feed_id) REFERENCES feeds (id)
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
    console.log(chalk.bold.white('\n  Seeding empty feed list.\n'))

    for (let i = 0; i < rssFeeds.length; i++) {
      try {
        // Check if feed is still available.
        const link = rssFeeds[i].link;
        const feed = await parser.parseURL(link);

        if (feed && feed.title && feed.link) {
          const title = feed.title.trim();
          console.log('    ' + chalk.green.bold(title));
          await db.exec('insertFeed', null, {
            bind: [title, link]
          });
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}

async function listArticles(db, filter = null) {
  try {
    let [feedsSelect] = await db.exec('selectFeeds');
    feedsSelect = feedsSelect.filter(x => x.subscribed_at);

    if (feedsSelect.length === 0)
      console.log(chalk.bold.white("\n  You aren't subscribed to any feeds yet. \n"));

    const now = Date.now();

    for (let i = 0; i < feedsSelect.length; i++) {
      const feed = feedsSelect[i];
      const last_fetch_at = new Date(feed.last_fetch_at).getTime();

      // Fetch articles if last update was over an hour ago.
      if (now - (last_fetch_at || 0) > HOUR) {
        // Fetch articles.
        const feedData = await parser.parseURL(feed.link);

        // Save articles to database.
        if (feedData && feedData.items.length > 0) {
          const articles = feedData.items;

          console.log(
            chalk.bold.white(`\n  Fetched ${articles.length} articles from ${feed.link}`)
          );

          for (let j = 0; j < articles.length; j++) {
            if (articles[j].title && articles[j].link) {
              await db.exec('insertArticle', null, {
                bind: [feed.id, articles[j].title, articles[j].link]
              });
            }
          }
        }
        console.log('');

        // Update database timestamp.
        await db.exec('updateFeedFetchTimestamp', null, {
          bind: [feed.link]
        });
      }
    }

    console.log('');
    let [articlesSelect] = await db.exec('selectArticles');

    if (filter.length > 0)
      articlesSelect = articlesSelect.filter(x => {
        return x.title.toLowerCase().match(filter.toLowerCase());
      });

    for (let i = 0; i < articlesSelect.length; i++) {
      console.log('  ' + chalk.green.bold(articlesSelect[i].title));
      console.log('  ' + chalk.yellow.bold(articlesSelect[i].link));
      console.log('');
    }
  } catch (e) {
    console.error(e);
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

    if (feed && feed.title && feed.link) {
      console.log('  Added: ' + chalk.green.bold(feed.title));
      await db.exec('insertFeed', [feed.title.trim(), link]);
    }
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
    await db.exec('unsubscribeFeed', null, { bind: [`%${link}%`] });
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
    --feeds              List all RSS feeds.
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
      const filter = cli.input.splice(1).join(' ');
      await listArticles(db, filter);
    } else if (command === 'feeds') {
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

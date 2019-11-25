'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const prompts = require('prompts')
const showHelp = require('../helpers/showHelp')
const Sequelize = require('sequelize')
const { table } = require('table')

/**
 * Constants
 */

const bookmarks_db = path.join(process.env.HOME, '.bookmarks.sqlite3')
const db = new Sequelize({ dialect: 'sqlite', storage: bookmarks_db, logging: false })

/**
 * Setup database
 */

async function setup_database() {
  try {
    const [results, _] = await db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='bookmarks';")

    if (results.length === 0) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS bookmarks (
          id integer primary key,
          url text,
          title text
        );
      `)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast bookmarks

  Options:
    --add, -a URL   Add a bookmark.
`, {
  description: 'A bookmark manager.',
  flags: {
    add: {
      type: 'string',
      alias: 'a'
    }
  }
})

/**
 * Define script
 */

async function os_script() {
  showHelp(cli)

  try {
    await setup_database()

    if (cli.flags.add) {
      const res = await prompts({
        type: 'text',
        name: 'title',
        message: 'Title:'
      })

      await db.query('INSERT INTO bookmarks (title, url) VALUES (:title, :url)', {
        replacements: {
          title: res.title,
          url: cli.flags.add
        }
      })
    } else {
      const results = await db.query('SELECT * FROM bookmarks;')
      const data = results[0].map(item => [item.title, item.url])

      const config = {
        columns: {
          0: {
            alignment: 'left'
          },
          1: {
            alignment: 'left'
          }
        }
      }

      const output = table(data, config)

      console.log(output)
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Export script
 */

module.exports = os_script

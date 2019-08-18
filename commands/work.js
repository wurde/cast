'use strict'

/**
 * Dependencies
 */

const path = require('path')
const fs = require('fs')
const Sequelize = require('sequelize')

/**
 * Constants
 */

const work_db = path.join(process.env.HOME, '.work.sqlite3')
const db = new Sequelize({ dialect: 'sqlite', storage: work_db, logging: false })
const cwd = process.cwd()

/**
 * Setup database
 */

async function setup_database() {
  try {
    const [results, _] = await db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='entries';")

    if (results.length === 0) {
      await db.query('CREATE TABLE IF NOT EXISTS entries (id integer primary key, working_directory text, start_at integer, end_at integer);')
    }
  } catch(err) {
    console.error(err)
  }
}

async function close_database() {
  await db.close()
}

/**
 * Define script
 */

async function work(argv) {
  try {
    await setup_database()

    if (argv[3] === 'clockin') {
      console.log('Clocking in for work')
      await db.query(`INSERT INTO entries (working_directory, start_at) VALUES ('${cwd}', ${Date.now()});`)
    } else if (argv[3] === 'clockout') {
      console.log('Clocking out of work')
      await db.query(`UPDATE entries SET end_at = ${Date.now()} WHERE end_at IS NULL;`)
    } else {
      console.log(`Work REPORT`)
    }

    await close_database()
  } catch(err) {
    console.error(err)
  }
}

/**
 * Export script
 */

module.exports = work

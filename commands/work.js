'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const moment = require('moment')
const Sequelize = require('sequelize')
const showHelp = require('../helpers/showHelp')

/**
 * Constants
 */

const work_db = path.join(process.env.HOME, '.work.sqlite3')
const db = new Sequelize({ dialect: 'sqlite', storage: work_db, logging: false })
const cwd = process.cwd()

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast work
`, {
  description: 'Clock in and out of work.'
})

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

/**
 * Close database
 */

async function close_database() {
  await db.close()
}

/**
 * Define script
 */

async function work() {
  showHelp(cli)

  const command = cli.input[1]

  try {
    await setup_database()

    console.log('')
    if (command === 'clockin') {
      console.log('Clocking in for work')
      await db.query(`INSERT INTO entries (working_directory, start_at) VALUES ('${cwd}', ${Date.now()});`)
    } else if (command === 'clockout') {
      console.log('Clocking out of work')
      await db.query(`UPDATE entries SET end_at = ${Date.now()} WHERE end_at IS NULL;`)
    } else {
      const [inprogress_result, _1] = await db.query('SELECT * FROM entries WHERE end_at IS NULL ORDER BY start_at ASC LIMIT 1;')

      if (inprogress_result.length === 1) {
        console.log(`In progress: ${moment(inprogress_result.start_at).fromNow(true)}`)
      }

      const date = new Date()
      const date_utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      const [done_result, _2] = await db.query(`SELECT * FROM entries WHERE end_at IS NOT NULL AND start_at > ${date_utc} ORDER BY start_at ASC;`)

      if (done_result.length >= 1) {
        let total_work = 0
        for (let i = 0; i < done_result.length; i++) {
          total_work += moment(done_result[i].end_at).diff(moment(done_result[i].start_at))
        }

        console.log(`Total: ${moment.duration(total_work, 'milliseconds').humanize()}`)
        console.log(`Started At: ${new Date(done_result[0].start_at).toTimeString()}`)
        console.log(`Ended At: ${new Date(done_result[done_result.length - 1].end_at).toTimeString()}`)
        console.log(`Today: ${date.toDateString()}`)
      } else {
        console.log('Nothing to report')
      }
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

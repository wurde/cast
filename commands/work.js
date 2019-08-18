'use strict'

/**
 * Dependencies
 */

const path = require('path')
const fs = require('fs')
const knex = require('knex')

/**
 * Constants
 */

const work_db = path.join(process.env.HOME, '.work.sqlite3')
const db = knex({
  client: 'sqlite3',
  useNullAsDefault: false,
  connection: { filename: work_db }
})

/**
 * Setup database
 */

function setup_database() {
  if (fs.existsSync(work_db) === false) {
    console.log('setup_database')
  }
}

/**
 * Define script
 */

function work(argv) {
  setup_database()

  // if (argv[3] === 'clockin') {
  //   console.log(`Work CLOCKIN`)
  // } else if (argv[3] === 'clockout') {
  //   console.log(`Work CLOCKOUT`)
  // } else {
  //   console.log(`Work REPORT`)
  // }
}

/**
 * Export script
 */

module.exports = work

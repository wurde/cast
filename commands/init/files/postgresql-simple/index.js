'use strict'

/**
 * Dependencies
 */

const pg = require('pg')

/**
 * Define and connect client
 */

const client = new Client({
  host: "localhost",
  user: "wurde",
  password: "trichoderma",
  database: "pg_development"
})

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

/**
 * Run pending migrations
 */

client.query(require('db/migrations/201904220518_create_schema_migrations').up)

/**
 * Load seed data
 */

client.query(require('db/seeds/development_seed'))

/**
 * Run example query
 */

client.query("SELECT * FROM schema_migrations", (err, res) => {
  if (err) {
    console.error(err);
    exit(1)
  }
  console.log(JSON.stringify(res, null, 2))
})

/**
 * Close database connection
 */

client.close()

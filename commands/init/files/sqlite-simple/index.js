'use strict'

/**
 * Dependencies
 */

const sqlite3 = require('sqlite3').verbose()

/**
 * Open database connection
 */

const db = new sqlite3.Database('./db/development.sqlite')

/**
 * Run pending migrations
 */

db.query(require('db/migrations/201904220518_create_schema_migrations').up)

/**
 * Load seed data
 */

db.query(require('db/seeds/development_seed'))

/**
 * Run example query
 */

let results = db.query("SELECT * FROM schema_migrations")
console.log(JSON.stringify(results, null, 2))

/**
 * Close database connection
 */

db.close()

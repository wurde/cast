'use strict'

/**
 * Dependencies
 */

const express = require('express')

/**
 * Constants
 */

const port = process.env.PORT || 8080

/**
 * Define app
 */

const app = express()

/**
 * Middleware
 */

app.use(express.json())

/**
 * Routes
 */

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Start server
 */

if (module === require.main) {
  app.listen(port, () => {
    console.log(`Express running on port ${port}.`)
  })
}

/**
 * Export app
 */

module.exports = app

'use strict'

/**
 * Dependencies
 */

const express = require('express')

/**
 * Constants
 */

const port = 3000

/**
 * Define app
 */

const app = express()

/**
 * Mount routes
 */

app.get('/', (req, res) => res.send('Hello World!'))

/**
 * Start server
 */

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

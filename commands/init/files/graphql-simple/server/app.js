'use strict'

/**
 * Dependencies
 */

const path = require('path')
const express = require('express')
const cors = require('cors')
const express_graphql = require('express-graphql')

/**
 * Define app
 */

const app = express()

/**
 * Constants
 */

const title = "GraphQL Simple"
const port = process.env.PORT || 8080
const env = process.env.NODE_ENV || "development"
const base = path.join(__dirname, "..")
const views = path.join(base, "/app/views")

/**
 * Locals
 */

app.locals.title = title
app.locals.port = port
app.locals.env = env
app.locals.base = base
app.locals.views = views
app.locals.posts = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
]

/**
 * Settings
 */

app.set("env", env)
app.disable("x-powered-by")
app.set("json spaces", 2)

/**
 * Middleware
 */

app.use(cors())
app.use(require(base + "/lib/middleware/parsers/json_body_parser"))
app.use(require(base + "/lib/middleware/parsers/urlencoded_body_parser"))

/**
 * Routes
 */

app.use("/", express_graphql({
  schema: require(base + '/api/schema')(app),
  graphiql: true
}))

/**
 * Error handlers
 */

app.use(require(base + "/lib/middleware/errors/page_not_found"))
app.use(require(base + "/lib/middleware/errors/render_error"))

/**
 * Start server
 */

async function start_server() {
  /**
   * Start listening for requests.
   */

  const server = app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
  })

  /**
   * Set process title.
   */

  process.title = 'graphql'
}

if (module === require.main) {
  start_server()
}

/**
 * Export app
 */

module.exports = app

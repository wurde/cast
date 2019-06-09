'use strict'

/**
 * Dependencies
 */

const express = require('express')
const path = require('path')
const ejs = require('ejs')

/**
 * Define app
 */

const app = express()

/**
 * Constants
 */

const title = "Express Turbolinks"
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

/**
 * Settings
 */

app.set("env", env)
app.enable("trust proxy")
app.disable("x-powered-by")
app.set("json spaces", 2)

/**
 * View engine
 */

app.engine("html.ejs", ejs.renderFile)
app.set("view engine", "html.ejs")
app.set("views", views)

/**
 * Middleware
 */

app.use(require(base + "/lib/middleware/parsers/json_body_parser"))
app.use(require(base + "/lib/middleware/parsers/urlencoded_body_parser"))

/**
 * Routes
 */

app.use("/", require("./routes/root_router")(app))

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

  process.title = 'express-turbo'
}

if (module === require.main) {
  start_server()
}

/**
 * Export app
 */

module.exports = app

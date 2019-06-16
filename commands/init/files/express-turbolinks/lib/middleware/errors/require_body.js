'use strict'

/**
 * Define middleware
 */

function require_body(keys) {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: { message: 'Missing request body.' } })
    }

    let body_keys = Object.keys(req.body)
    let missing_keys = keys.filter(x => !body_keys.includes(x))

    if (missing_keys.length === 0) {
      next()
    } else {
      res.status(400).json({ error: { message: `Missing fields: ${missing_keys.join(', ')}.` } })
    }
  }
}

/**
 * Export middleware
 */

module.exports = require_body

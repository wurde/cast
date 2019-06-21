'use strict'

/**
 * Define middleware
 */

function require_body(keys) {
  return (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: { message: 'Missing request body' } })
    }

    let missing_keys = keys.filter(key => !Object.keys(req.body).includes(key))

    if (missing_keys.length > 0) {
      return res.status(422).json({ error: {
        message: `Missing fields: ${missing_keys.join(' ')}`
      }})
    }

    next()
  }
}

/**
 * Export middleware
 */

module.exports = require_body

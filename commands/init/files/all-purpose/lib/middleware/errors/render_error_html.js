'use strict'

/**
 * Define middleware
 */

function render_error_html(err, req, res, next) {
  err.status = err.status || 500
  err.message = err.message || 'Internal Server Error'
  if (req.app.locals.env === 'production') { err.stack = undefined }

  console.error(err.message)

  res.status(err.status).render('error', {
    'status': err.status,
    'error': err
  })
}

/**
 * Export middleware
 */

module.exports = render_error_html

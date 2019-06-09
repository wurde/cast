'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Define component
 */

function Error404(props) {
  return (
    <styles.Error404Style>
      <h1>Error 404</h1>
      <p>Sorry for the inconvenience!</p>
    </styles.Error404Style>
  )
}

/**
 * Export component
 */

module.exports = Error404

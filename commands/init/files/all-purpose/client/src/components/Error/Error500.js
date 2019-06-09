'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Define component
 */

function Error500(props) {
  return (
    <styles.Error500Style>
      <h1>Error 500</h1>
      <p>Sorry for the inconvenience!</p>
    </styles.Error500Style>
  )
}

/**
 * Export component
 */

module.exports = Error500

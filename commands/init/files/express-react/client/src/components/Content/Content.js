'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Define component
 */

function Content(props) {
  return (
    <styles.ContentStyle>
      This is the main content!
    </styles.ContentStyle>
  )
}

/**
 * Export component
 */

module.exports = Content

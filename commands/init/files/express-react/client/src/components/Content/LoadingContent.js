'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Define component
 */

function LoadingContent(props) {
  return (
    <styles.LoadingContentStyle>
      <h1>Loading Content...</h1>
    </styles.LoadingContentStyle>
  )
}

/**
 * Export component
 */

module.exports = LoadingContent

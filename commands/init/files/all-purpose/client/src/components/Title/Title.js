'use strict'

/**
 * Dependencies
 */

const React = require('react')
const styles = require('./styles/index')

/**
 * Define component
 */

function Title(props) {
  return (
    <styles.TitleStyle>
      <h1>{props.text}</h1>
    </styles.TitleStyle>
  )
}

/**
 * Export component
 */

module.exports = Title

'use strict'

/**
 * Dependencies
 */

const styled_components = require('styled-components')

/**
 * Constants
 */

const styled = styled_components.default

/**
 * Define style component
 */

let ContentStyle = styled.div(() => `
  background-color: #AAA;
`)

/**
 * Export style component
 */

module.exports = ContentStyle

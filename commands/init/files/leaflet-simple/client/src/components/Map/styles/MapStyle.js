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

let ModelStyle = styled.div(() => `
  height: 600px;
  overflow: none;
`)

/**
 * Export style component
 */

module.exports = ModelStyle

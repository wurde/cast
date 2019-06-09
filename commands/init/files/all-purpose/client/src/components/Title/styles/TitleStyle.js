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

let TitleStyle = styled.div(() => `
  text-decoration: underline;
`)

/**
 * Export style component
 */

module.exports = TitleStyle

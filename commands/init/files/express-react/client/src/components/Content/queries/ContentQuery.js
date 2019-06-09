'use strict'

/**
 * Dependencies
 */

const react_relay = require('react-relay')

/**
 * Constants
 */

const graphql = react_relay.graphql
const QueryRenderer = react_relay.QueryRenderer

/**
 * Define query component
 */

class ContentQuery extends QueryRenderer {
}

/**
 * Export query component
 */

module.exports = ContentQuery

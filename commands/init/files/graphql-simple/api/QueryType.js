'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')
  const field_config = require('./field_config/query/index')(app)

  /**
   * Constants
   */

  // https://graphql.org/graphql-js/type/#graphqlobjecttype
  const GraphQLObjectType = graphql.GraphQLObjectType

  /**
   * Define type
   */

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'The root type for implementing GraphQL queries.',
    fields: {
      hello: field_config.hello,
      allPosts: field_config.allPosts,
      findPost: field_config.findPost,
    }
  })

  /**
   * Export type
   */

  return QueryType
}

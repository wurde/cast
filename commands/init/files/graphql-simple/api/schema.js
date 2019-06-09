'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')
  const QueryType = require('./QueryType')(app)
  const MutationType = require('./MutationType')(app)

  /**
   * Constants
   */

  // https://graphql.org/graphql-js/type/#graphqlschema
  const GraphQLSchema = graphql.GraphQLSchema

  /**
   * Define schema
   */

  const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  })

  /**
   * Export schema
   */

  return schema
}

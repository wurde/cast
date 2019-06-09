'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')
  const field_config = require('./field_config/mutation/index')(app)

  /**
   * Constants
   */

  // https://graphql.org/graphql-js/type/#graphqlobjecttype
  const GraphQLObjectType = graphql.GraphQLObjectType

  /**
   * Define type
   */

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root type for implementing GraphQL mutations.',
    fields: {
      createPost: field_config.createPost,
      updatePost: field_config.updatePost,
      deletePost: field_config.deletePost,
    }
  })

  /**
   * Export type
   */

  return MutationType
}

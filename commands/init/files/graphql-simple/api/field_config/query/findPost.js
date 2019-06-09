'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')
  const types = require('../../types/index')

  /**
   * Constants
   */

  // https://graphql.org/graphql-js/type/#graphqlnonnull
  const GraphQLNonNull = graphql.GraphQLNonNull
  // https://graphql.org/graphql-js/type/#graphqlint
  const GraphQLInt = graphql.GraphQLInt
  const PostType = types.PostType

  /**
   * Define config
   */

  const findPost = {
    type: new GraphQLNonNull(PostType),
    description: 'Return a specific post.',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'The unique identifier of a specific Post.'
      }
    },
    resolve: (parent, args) => {
      return app.locals.posts.reduce((_, post) => (post.id === args.id) ? post : _, {})
    }
  }

  /**
   * Export config
   */

  return findPost
}

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

  // https://graphql.org/graphql-js/type/#graphqllist
  const GraphQLList = graphql.GraphQLList
  const PostType = types.PostType

  /**
   * Define config
   */

  const posts = {
    type: new GraphQLList(PostType),
    description: "Return all posts.",
    resolve: () => (app.locals.posts)
  }

  /**
   * Export config
   */

  return posts
}

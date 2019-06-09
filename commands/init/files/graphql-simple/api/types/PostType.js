'use strict'

/**
 * Dependencies
 */

const graphql = require('graphql')

/**
 * Constants
 */

const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const GraphQLInt = graphql.GraphQLInt

/**
 * Define type
 */

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
  }
})

/**
 * Export type
 */

module.exports = PostType

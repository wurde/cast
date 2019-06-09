'use strict'

/**
 * Dependencies
 */

const graphql = require('graphql')
const types = require('../types/index')

/**
 * Constants
 */

const GraphQLNonNull = graphql.GraphQLNonNull
const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLString = graphql.GraphQLString
const PostType = types.PostType

/**
 * Define payload type
 */

const CreatePostPayloadType = new GraphQLObjectType({
  name: "CreatePostPayload",
  description: "The output of our createPost mutation.",
  fields: {
    post: {
      type: PostType,
      description: "The Post that was created by this mutation."
    }
  }
})

/**
 * Export payload type
 */

module.exports = CreatePostPayloadType

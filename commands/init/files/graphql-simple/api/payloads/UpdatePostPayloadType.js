'use strict'

/**
 * Dependencies
 */

const graphql = require('graphql')
const types = require('../types/index')

/**
 * Constants
 */

const GraphQLObjectType = graphql.GraphQLObjectType
const PostType = types.PostType

/**
 * Define payload type
 */

const UpdatePostPayloadType = new GraphQLObjectType({
  name: "UpdatePostPayload",
  description: "The output of our updatePost mutation.",
  fields: {
    post: {
      type: PostType,
      description: "The Post that was updated by this mutation."
    }
  }
})

/**
 * Export payload type
 */

module.exports = UpdatePostPayloadType

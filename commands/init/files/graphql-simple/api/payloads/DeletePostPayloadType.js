'use strict'

/**
 * Dependencies
 */

const graphql = require('graphql')

/**
 * Constants
 */

const GraphQLObjectType = graphql.GraphQLObjectType
const GraphQLBoolean = graphql.GraphQLBoolean

/**
 * Define payload type
 */

const DeletePostPayloadType = new GraphQLObjectType({
  name: "DeletePostPayload",
  description: "The output of our deletePost mutation.",
  fields: {
    isDeleted: {
      type: GraphQLBoolean,
      description: "True if the Post that was deleted by this mutation."
    }
  }
})

/**
 * Export payload type
 */

module.exports = DeletePostPayloadType

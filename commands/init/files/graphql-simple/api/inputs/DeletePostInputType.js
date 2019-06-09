'use strict'

/**
 * Dependencies
 */

const graphql = require('graphql')

/**
 * Constants
 */

const GraphQLInputObjectType = graphql.GraphQLInputObjectType
const GraphQLNonNull = graphql.GraphQLNonNull
const GraphQLInt = graphql.GraphQLInt

/**
 * Define input type
 */

const DeletePostInputType = new GraphQLInputObjectType({
  name: "DeletePostInput",
  description: "All input for the deletePost mutation.",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    }
  }
})

/**
 * Export input type
 */

module.exports = DeletePostInputType

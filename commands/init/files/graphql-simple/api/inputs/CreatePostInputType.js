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
const GraphQLString = graphql.GraphQLString
const GraphQLInt = graphql.GraphQLInt

/**
 * Define input type
 */

const CreatePostInputType = new GraphQLInputObjectType({
  name: "CreatePostInput",
  description: "All input for the createPost mutation.",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
})

/**
 * Export input type
 */

module.exports = CreatePostInputType

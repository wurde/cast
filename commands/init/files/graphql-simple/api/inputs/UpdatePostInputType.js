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

const UpdatePostInputType = new GraphQLInputObjectType({
  name: "UpdatePostInput",
  description: "All input for the updatePost mutation.",
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

module.exports = UpdatePostInputType

'use strict'

module.exports = (app) => {
  /**
   * Dependencies
   */

  const graphql = require('graphql')
  const payloads = require('../../payloads/index')
  const inputs = require('../../inputs/index')

  /**
   * Constants
   */

  const CreatePostPayloadType = payloads.CreatePostPayloadType
  const CreatePostInputType = inputs.CreatePostInputType

  /**
   * Define field config
   */

  const createPost = {
    description: "Create a single Post.",
    type: CreatePostPayloadType,
    args: {
      input: {
        type: CreatePostInputType,
        description: "The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields."
      }
    },
    resolve: (parent, args) => {
      app.locals.posts.push(args.input)
      return args.input
    }
  }

  /**
   * Export field config
   */

  return createPost
}

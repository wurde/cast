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

  const UpdatePostPayloadType = payloads.UpdatePostPayloadType
  const UpdatePostInputType = inputs.UpdatePostInputType

  /**
   * Define field config
   */

  const updatePost = {
    description: "Update a single Post.",
    type: UpdatePostPayloadType,
    args: {
      input: {
        type: UpdatePostInputType,
        description: "The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields."
      }
    },
    resolve: (parent, args) => {
      app.locals.posts.forEach(post => {
        if (post.id === args.input.id) {
          post.title = args.input.title
        }
      })

      return args.input
    }
  }

  /**
   * Export field config
   */

  return updatePost
}

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

  const DeletePostPayloadType = payloads.DeletePostPayloadType
  const DeletePostInputType = inputs.DeletePostInputType

  /**
   * Define field config
   */

  const deletePost = {
    description: "Delete a single Post.",
    type: DeletePostPayloadType,
    args: {
      input: {
        type: DeletePostInputType,
        description: "The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields."
      }
    },
    resolve: (parent, args) => {
      let isDeleted = false

      app.locals.posts = app.locals.posts.filter(post => {
        if (post.id !== args.input.id) {
          return true
        } else {
          isDeleted = true
          return false
        }
      })

      return { isDeleted: isDeleted }
    }
  }

  /**
   * Export field config
   */

  return deletePost
}

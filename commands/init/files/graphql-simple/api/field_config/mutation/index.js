'use strict'

/**
 * Export field config
 */

module.exports = (app) => ({
  createPost: require('./createPost')(app),
  updatePost: require('./updatePost')(app),
  deletePost: require('./deletePost')(app),
})

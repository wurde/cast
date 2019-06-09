'use strict'

/**
 * Export field config
 */

module.exports = (app) => ({
  allPosts: require('./allPosts')(app),
  findPost: require('./findPost')(app),
  hello: require('./hello')(app),
})

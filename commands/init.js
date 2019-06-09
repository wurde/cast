'use strict'

/**
 * Dependencies
 */

const init_index = require('./init/index')

/**
 * Constants
 */

const init_keys = Object.keys(init_index)

/**
 * Define script
 */

function init(template) {
  if (init_keys.includes(template)) {
    let init = new init_index[template]()

    init.run()
  } else {
    throw new Error(`Template not found for '${template}'.`)
  }
}

/**
 * Export script
 */

module.exports = (argv) => {
  if (argv.length >= 4) {
    init(argv[3])
  } else {
    throw new Error("Missing argument: template name.")
  }
}

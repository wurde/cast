'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')

/**
 * Constants
 */

const template_dir = path.join(__dirname, '..', 'templates')

/**
 * Define script
 */

function copy(file) {
  const template = path.join(template_dir, file)

  if (fs.existsSync(file)) {
    throw new Error(`File already exists: '${file}'`)
  }

  if (!fs.existsSync(template)) {
    throw new Error(`Missing template: '${file}'`)
  }

  console.log(`\nCopying ${file}`)
  fs.copyFileSync(template, file)
}

/**
 * Export script
 */

module.exports = (argv) => {
  if (argv.length >= 4) {
    copy(argv[3])
  } else {
    throw new Error("Missing argument: template name.")
  }
}

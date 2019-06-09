'use strict'

/**
 * Define script
 */

function gstorage() {
  console.log(`
// Download entire Google Storage bucket to local directory.
gsutil cp -r gs://my-bucket/files .
  `)

  console.log(`
// Upload entire local directory to Google Storage bucket.
gsutil cp -r . gs://my-bucket/files
  `)
}

/**
 * Export script
 */

module.exports = (argv) => {
  gstorage()
}

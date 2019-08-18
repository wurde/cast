'use strict'

module.exports = (argv) => {
  if (argv[3] === 'clockin') {
    console.log(`Work CLOCKIN`)
  } else if (argv[3] === 'clockout') {
    console.log(`Work CLOCKOUT`)
  } else {
    console.log(`Work REPORT`)
  }
}

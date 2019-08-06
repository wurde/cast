/**
 * Dependencies
 */

const path = require('path')
const YAML = require('yamljs')

/**
 * Define script
 */

function yaml2json() {
  const argv = require('yargs').argv

  if (argv.reverse || argv.r) {
    // const json = require('./file.json')
    console.log('Parse JSON 2 YAML')
  } else {
    // const yaml = YAML.load('./file.yaml')
    console.log('Parse YAML 2 JSON')
  }
}

/**
 * Export script
 */

module.exports = yaml2json

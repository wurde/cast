'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const cron = require('cron')
const showHelp = require('../helpers/showHelp')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast schedule

  Cron Examples
    * * * * * *           Every second.
    * 10 * * * *          Every ten minutes.
    0 */10 * * * *        Every tenth minute.
    0 */30 9-17 * * *     Every 30 minutes between 9-17.
    * 4-22 * * 1-5        Every Minute Between hours 4-22, Monday through Friday.
`)

/**
 * Define script
 */

function schedule() {
  showHelp(cli)

  const job = cron.job('* * * * * *', () => {
    console.log('Every second.')
  })

  job.start()
}

/**
 * Export script
 */

module.exports = schedule

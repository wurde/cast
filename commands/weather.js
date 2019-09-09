'use strict'

/**
 * Dependencies
 */

const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const weather_js2 = require('weather-js2')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast weather
`)

/**
 * Define script
 */

function weather() {
  showHelp(cli)

  const location = 'Houston, TX'

  weather_js2.find({ search: location, degreeType: 'F', resCount: 2 }, (err, result) => {
    if (err) console.error(err)

    const res = result.reduce((acc, curr) => {
      if (curr.location.name == location) {
        return location
      } else {
        return acc
      }
    })

    console.log(`${res.current.day} ${res.current.temperature} ℉  ${res.current.skytext}`)

    // Filter out historic forecasts
    res.forecast = res.forecast.filter(daily_forecast => daily_forecast.date >= res.current.date)

    res.forecast.forEach(daily_forecast => {
      console.log(daily_forecast.day)
      console.log(daily_forecast.low),
      console.log(daily_forecast.high)
    })
  })
}

/**
 * Export script
 */

module.exports = weather

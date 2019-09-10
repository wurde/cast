'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')
const showHelp = require('../helpers/showHelp')
const weather_js2 = require('weather-js2')
const {table} = require('table')
const chalk = require('chalk')
const figlet = require('figlet')

/**
 * Constants
 */

const weather_config_path = path.join(process.env.HOME, '.weather')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast weather [LOCATION]
`)

/**
 * Define helpers
 */

function figlet_text(text) {
  return new Promise((resolve, reject) => {
    figlet.text(text, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

function weather_js2_async(location) {
  return new Promise((resolve, reject) => {
    weather_js2.find({ search: location, degreeType: 'F', resCount: 1 }, async (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

function generate_icon(code) {
  let icon

  if (['0', '1', '2', '3', '4', '11', '12'].includes(code)) {
    icon = chalk.blue.bold('\u2602') // thunderstorm
  } else if (['5', '6', '7', '8', '9', '10', '13', '14', '15', '16'].includes(code)) {
    icon = '' // rain sleet snow
  } else if (['31', '32', '33', '34'].includes(code)) {
    icon = chalk.yellow.bold('\u2600') // sunny
  } else if (['26', '27', '28', '29', '30'].includes(code)) {
    icon = chalk.white.bold('\u2601') // cloudy
  } else {
    icon = ' '
  }

  return icon
}

 /**
 * Define script
 */

async function weather() {
  showHelp(cli)

  let location
  if (cli.input.length > 1) {
    location = cli.input.slice(1, cli.input.length).join(' ')
    fs.writeFileSync(weather_config_path, location)
  } else {
    if (fs.existsSync(weather_config_path)) {
      location = fs.readFileSync(weather_config_path)
    } else {
      location = 'Houston, TX'
    }
  }

  try {
    const result = await weather_js2_async(location)

    const res = result.reduce((acc, curr) => {
      if (curr.location.name == location) {
        return location
      } else {
        return acc
      }
    })

    console.log(`\nLocation: ${res.location.name}\n`)
    console.log(`${generate_icon(res.current.skycode)}  ${res.current.skytext}`)
    console.log(`   Today ${res.current.temperature} ℉`)
    console.log(`   ${res.current.winddisplay}`)
    console.log('')

    // Filter out historic forecasts
    res.forecast = res.forecast.filter(daily_forecast => daily_forecast.date >= res.current.date)

    const res_array = res.forecast.map(daily_forecast => {
      let icon = generate_icon(daily_forecast.skycodeday)
      return `${icon}  ${daily_forecast.skytextday}\n   ${daily_forecast.shortday} ${chalk.green.bold(daily_forecast.high)} - ${chalk.green.bold(daily_forecast.low)} ℉\n   Precipitation ${daily_forecast.precip}%`
    })

    console.log(table([res_array]))
    console.log('')
  } catch(err) {
    console.error(chalk.red.bold(`Coudn't find location: ${location}`))
    process.exit(1)
  }
}

/**
 * Export script
 */

module.exports = weather

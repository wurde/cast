'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const weather_js2 = require('weather-js2');
const {table} = require('table');
const chalk = require('chalk');
const figlet = require('figlet');
const showHelp = require('../helpers/showHelp');
const isMainCommand = require('../helpers/isMainCommand');
const Storage = require('../helpers/Storage');

/**
 * Constants
 */

const CONFIG_PATH = path.join(process.env.HOME, '.weather.json');
const CONFIG_DEFAULT = {
  location: 'Houston, TX',
  scale: 'fahrenheit'
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast weather [LOCATION]

  Options
    --celsius     Degrees in Celsius.
    --fahrenheit  Degrees in Fahrenheit (Default).
`, {
  flags: {
    celsius: {
      type: 'boolean',
      alias: 'c',
    },
    fahrenheit: {
      type: 'boolean',
      alias: 'f',
    }
  }
});

/**
 * Define helpers
 */

function fetchWeather(location, scale) {
  const degreeType = (scale == 'fahrenheit') ? 'F' : 'C';

  return new Promise((resolve, reject) => {
    weather_js2.find({ search: location, degreeType: degreeType, resCount: 1 }, async (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function generateIcon(code) {
  let icon;

  if (['0', '1', '2', '3', '4', '11', '12', '17', '18', '35', '37', '38', '39', '40', '45', '47'].includes(code)) {
    icon = chalk.blue.bold('\u2602'); // thunderstorm
  } else if (['5', '6', '7', '8', '9', '10', '13', '14', '15', '16', '25', '41', '42', '43', '46'].includes(code)) {
    icon = chalk.white.bold('\u2603'); // rain sleet snow
  } else if (['31', '32', '33', '34', '36'].includes(code)) {
    icon = chalk.yellow.bold('\u2600'); // sunny
  } else if (['19', '20', '21', '22', '23', '24', '26', '27', '28', '29', '30'].includes(code)) {
    icon = chalk.white.bold('\u2601'); // cloudy
  } else {
    icon = ' ';
  }

  return icon;
}

function renderScale(scale) {
  return scale == 'fahrenheit' ? '°F' : '°C';
}

function buildOutput(res, scale) {
  return `
Location: ${res.location.name}

${generateIcon(res.current.skycode)}  ${res.current.skytext}
   Today ${res.current.temperature} ${renderScale(scale)}
   ${res.current.winddisplay}

`
  // console.log(`\nLocation: ${res.location.name}\n`);
  // console.log(`${generateIcon(res.current.skycode)}  ${res.current.skytext}`);
  // console.log(`   Today ${res.current.temperature} ${renderScale(scale)}`);
  // console.log(`   ${res.current.winddisplay}`);
  // console.log('');
}

function setScale(options, cli, config) {
  if (options.celsius) return 'celsius';
  if (options.fahrenheit) return 'fahrenheit';
  if (cli.flags.celsius === true) return 'celsius';
  if (cli.flags.fahrenheit === true) return 'fahrenheit';
  return config.scale;
}

 /**
 * Define script
 */

async function weather(location = null, options = {}) {
  showHelp(cli);

  const config = new Storage(CONFIG_PATH);

  // Cache location.
  location = location || cli.input.slice(1, cli.input.length).join(' ') || config.location;
  config.location = location;

  // Cache temperature scale.
  const scale = setScale(options, cli, config);
  config.scale = scale;

  try {
    const result = await fetchWeather(location, scale);

    const res = result.reduce((acc, curr) => {
      if (curr.location.name == location) {
        return location
      } else {
        return acc
      }
    });

    // Filter out historic forecasts
    res.forecast = res.forecast.filter(daily_forecast => daily_forecast.date >= res.current.date);

    // Format daily forecasts.
    const res_array = res.forecast.map(daily_forecast => {
      let icon = generateIcon(daily_forecast.skycodeday)
      return `${icon}  ${daily_forecast.skytextday}\n   ${daily_forecast.shortday} ${chalk.green.bold(daily_forecast.high)} - ${chalk.green.bold(daily_forecast.low)} ${renderScale(scale)}\n   Precipitation ${daily_forecast.precip}%`
    });

    // Build weather output.
    let output = '';
    output += buildOutput(res, scale);
    output += table([res_array]);

    if (isMainCommand(module)) {
      console.log(output);
      console.log('');
    } else {
      return output;
    }
  } catch(err) {
    console.error(err);
    console.error(chalk.red.bold(`Coudn't find location: ${location}`));
    process.exit(1);
  }
}

/**
 * Export script
 */

module.exports = weather;

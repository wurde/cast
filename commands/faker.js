'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const faker = require('faker');
const chalk = require('chalk');
const showHelp = require('../helpers/showHelp');

/**
 * Generate contact
 */

function generateContact() {
  return {
    contact: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobArea: faker.name.jobArea(),
      jobTitle: faker.name.jobTitle(),
      jobDescriptor: faker.name.jobDescriptor(),
      jobType: faker.name.jobType(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
    },
    address: {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    },
    company: {},
    date: {},
  }
}

function printSample(data) {
  console.log(chalk.bold.green(`  ${data.contact.firstName} ${data.contact.lastName}`));
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast faker

  Options:
    -c, --count NUM   Number of samples to return. (Default 10)
`, {
  description: 'Fake data.',
  flags: {
    count: {
      type: 'number',
      alias: 'c',
      default: 10,
    }
  }
});

/**
 * Define script
 */

function fakerScript(count) {
  showHelp(cli);
  const samples = [];
  
  count = Math.abs(count || cli.flags.count);

  for (let i = 0; i < count; i++) {
    samples[i] = generateContact();
  }

  if (arguments.length === 0) {
    console.log('')
    for (let i = 0; i < count; i++) {
      printSample(samples[i]);
    }
    console.log('')
  }

  return samples;
}

/**
 * Export script
 */

module.exports = fakerScript;

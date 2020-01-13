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
    person: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      phone: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
    },
    address: {
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    },
    work: {
      jobArea: faker.name.jobArea(),
      jobTitle: faker.name.jobTitle(),
      jobDescriptor: faker.name.jobDescriptor(),
      jobType: faker.name.jobType(),
      department: faker.commerce.department(),
      productName: faker.commerce.productName(),
    },
    random: {
      color: faker.commerce.color(),
      uuid: faker.random.uuid(),
    }
  };
}

function printSample(data) {
  console.log(chalk.bold.green(`  ${data.person.firstName} ${data.person.lastName}`));
  console.log(`  ${data.person.phone} ${data.person.email} ${data.person.username}`);
  console.log(`  ${data.address.streetAddress}, ${data.address.city}, ${data.address.state}, ${data.address.zipCode}`);
  console.log(`  ${data.work.jobTitle}. ${data.work.jobDescriptor}. ${data.work.jobType}`);
  console.log(`  ${data.random.color} ${data.random.uuid}`);
  console.log('');
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
      default: 5,
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

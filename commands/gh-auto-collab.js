'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const prompts = require('prompts');
const chalk = require('chalk');
const axios = require('axios');
const gitConfig = require('./git-config');
const showHelp = require('../helpers/showHelp');

/**
 * Constants
 */

const BASE_URL = 'https://api.github.com';

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast gh-auto-collab
  
  Options:
    -u, --user USERNAME    (required)
`, {
    description: 'Auto-accept collaboration invitations on Github.',
    flags: {
      "user": {
        type: 'string',
        alias: 'u',
      }
    }
  }
);

/**
 * Define script
 */

async function gh_auto_collab() {
  showHelp(cli);
  // TODO get default user from git.config;
  console.log('gitConfig', gitConfig(['--list', '--global']));
  process.exit(0);

  // Prompt user for password.
  const password = await prompts({
    type: 'password',
    name: 'value',
    message: 'Enter your GitHub password:'
  });

  const auth = {
    username: cli.flags.user,
    password: password.value  
  }

  // Get all invitations
  const { data: allInvites } = await axios.get(
    `${BASE_URL}/user/repository_invitations`,
    { auth }
  );

  if (allInvites.length === 0) {
    console.log(chalk.white.bold('No pending invites'))
    return 'No pending invites.'
  }

  // Accept all collaboration invites
  let acceptedInvites = 0
  for (let invite of allInvites) {
    const { id } = invite;
    try {
      await axios.patch(
        `${BASE_URL}/user/repository_invitations/${id}`, 
        null,
        { auth }
      );
      acceptedInvites++;
    } catch (e) {
      console.error(
        chalk.red.bold('\n  Error accepting invite.'),
        chalk.white.bold(`Status: ${e.response.statusText}`)
      );
    }
  }

  if (acceptedInvites === allInvites.length) {
    console.log(chalk.green.bold('\n  Successfully accepted all invites.\n'));
    return 'Successfully accepted all invites.';
  } else {
    console.log(chalk.yellow.bold(`\n  Accepted ${acceptedInvites} of ${allInvites.length} requests.\n`));
    return `Accepted ${acceptedInvites} of ${allInvites.length} requests`;
  }
}

/**
 * Export script
 */

module.exports = gh_auto_collab;

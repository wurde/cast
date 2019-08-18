'use strict'

/**
 * Dependencies
 */

const meow = require('meow')

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tasks <input>

  Options
    --create, -c  Create a task.
    --done, -d  Mark task as done.
    --remove  Remove a specific task.
    --clear  Clear all tasks marked as done.
`, {
  flags: {
    create: {
      type: 'boolean',
      alias: 'c'
    },
    done: {
      type: 'boolean',
      alias: 'd'
    },
    clear: {
      type: 'boolean'
    }
  }
})

/**
 * Define script
 */

function tasks(argv) {
  if (cli.flags.create || cli.flags.c || cli.input[1] === 'create') {
    // TODO Create a task.
  } else if (cli.flags.done || cli.flags.d || cli.input[1] === 'done') {
    // TODO Mark a task as done.
  } else if (cli.flags.clear || cli.input[1] === 'clear') {
    // TODO Clear tasks marked as done.
  } else {
    // TODO List all tasks.
  }
}

/**
 * Export script
 */

module.exports = tasks

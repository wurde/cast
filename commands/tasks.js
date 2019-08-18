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
  console.log('Tasks')
  console.log('input', cli.input[1])
  console.log('flags', cli.flags)
}

/**
 * Export script
 */

module.exports = tasks

'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const prompts = require('prompts')
const Sequelize = require('sequelize')

/**
 * Constants
 */

const tasks_db = path.join(process.env.HOME, '.tasks.sqlite3')
const db = new Sequelize({ dialect: 'sqlite', storage: tasks_db, logging: false })
const cwd = process.cwd()

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
 * Setup database
 */

async function setup_database() {
  try {
    const [results, _] = await db.query("SELECT name FROM sqlite_master WHERE type='table' AND name='tasks';")

    if (results.length === 0) {
      await db.query('CREATE TABLE IF NOT EXISTS tasks (id integer primary key, working_directory text, description text, done_at integer);')
    }
  } catch(err) {
    console.error(err)
  }
}

/**
 * Close database
 */

async function close_database() {
  await db.close()
}

/**
 * Define script
 */

async function tasks() {
  try {
    await setup_database()

    if (cli.flags.create || cli.flags.c || cli.input[1] === 'create') {
      console.log('Creating a task...')
      const res = await prompts({
        type: 'text',
        name: 'task',
        message: 'Description:'
      })

      if (res.task) {
        await db.query(`INSERT INTO tasks (working_directory, description) VALUES ('${cwd}', '${res.task}');`)
      }
    } else if (cli.flags.done || cli.flags.d || cli.input[1] === 'done') {
      console.log('Marking task as done...')
      const res = await prompts({
        type: 'text',
        name: 'task',
        message: 'Description:'
      })

      if (res.task) {
        await db.query(`UPDATE tasks SET done_at = ${Date.now()} WHERE description LIKE '%${res.task}%';`)
      }
    } else if (cli.flags.clear || cli.input[1] === 'clear') {
      console.log('Clearing all tasks marked as done...')
      await db.query(`DELETE FROM tasks WHERE working_directory = '${cwd}' AND done_at IS NOT NULL;`)
    } else {
      const [alltasks_result, _] = await db.query(`SELECT * FROM tasks;`)
      console.log('alltasks_result', alltasks_result)
      // TODO list pending,done tasks
    }

    await close_database()
  } catch(err) {
    console.error(err)
  }
}

/**
 * Export script
 */

module.exports = tasks

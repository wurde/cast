'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
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
    $ cast tasks <command>

  Options
    --create, -c  Create a task.
    --done, -d  Mark task as done.
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
  if (cli.flags.h) cli.showHelp()

  try {
    await setup_database()

    console.log('')
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
    } else if (cli.flags.all || cli.input[1] === 'all') {
      console.log('Printing all tasks across all projects...')
      const [alltasks_result, _] = await db.query(`SELECT * FROM tasks ORDER BY done_at, working_directory;`)

      for (let i = 0; i < alltasks_result.length; i++) {
        if (alltasks_result[i].done_at) {
          console.log(`  ${chalk.green('\u2713')}  ${alltasks_result[i].working_directory}  -  ${alltasks_result[i].description}`)
        } else {
          console.log(`  ${chalk.white('\u25A2')}  ${alltasks_result[i].working_directory}  -  ${alltasks_result[i].description}`)
        }
      }
    } else {
      console.log('Project:', cwd)
      console.log('Printing tasks...')
      const [alltasks_result, _] = await db.query(`SELECT * FROM tasks WHERE working_directory = '${cwd}' ORDER BY done_at;`)

      for (let i = 0; i < alltasks_result.length; i++) {
        if (alltasks_result[i].done_at) {
          console.log(`  ${chalk.green('\u2713')}  ${alltasks_result[i].description}`)
        } else {
          console.log(`  ${chalk.white('\u25A2')}  ${alltasks_result[i].description}`)
        }
      }
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

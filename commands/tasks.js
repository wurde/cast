'use strict'

/**
 * Dependencies
 */

const path = require('path')
const meow = require('meow')
const chalk = require('chalk')
const prompts = require('prompts')
const Sequelize = require('sequelize')
const showHelp = require('../helpers/showHelp')

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
  showHelp(cli)

  const command = cli.input[1]

  try {
    await setup_database()

    console.log('')
    if (cli.flags.create || cli.flags.c || command === 'create') {
      console.log('Project:', cwd, '\n')
      console.log('  Creating a task...')
      const res = await prompts({
        type: 'text',
        name: 'task',
        message: 'Description:'
      })

      if (res.task) {
        await db.query(`INSERT INTO tasks (working_directory, description) VALUES ('${cwd}', '${res.task}');`)
      }
    } else if (cli.flags.done || cli.flags.d || command === 'done') {
      console.log('Project:', cwd, '\n')
      console.log('  Marking task as done...')
      const res = await prompts({
        type: 'text',
        name: 'task',
        message: 'Description:'
      })

      if (res.task) {
        await db.query(`UPDATE tasks SET done_at = ${Date.now()} WHERE description LIKE '%${res.task}%';`)
      }
    } else if (cli.flags.clear || command === 'clear') {
      console.log('Project:', cwd, '\n')
      console.log('  Clearing all tasks marked as done...')
      await db.query(`DELETE FROM tasks WHERE working_directory = '${cwd}' AND done_at IS NOT NULL;`)
    } else if (cli.flags.all || command === 'all') {
      console.log('Printing all tasks across all projects...', '\n')
      const [alltasks_result, _] = await db.query(`SELECT * FROM tasks ORDER BY done_at, working_directory;`)

      for (let i = 0; i < alltasks_result.length; i++) {
        if (alltasks_result[i].done_at) {
          console.log(`  ${chalk.green('\u2713')}  ${alltasks_result[i].working_directory}  -  ${alltasks_result[i].description}`)
        } else {
          console.log(`  ${chalk.white('\u25A2')}  ${alltasks_result[i].working_directory}  -  ${alltasks_result[i].description}`)
        }
      }
    } else {
      console.log('Project:', cwd, '\n')
      console.log('  Printing tasks...')
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

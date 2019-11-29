'use strict'

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const showHelp = require('../helpers/showHelp');
const Database = require('../helpers/Database');

/**
 * Constants
 */

const cwd = process.cwd();
const dbPath = path.join(process.env.HOME, '.tasks.sqlite3');
const queries = {
  addTask: (cwd, description) => `
    INSERT INTO tasks (
      working_directory,
      description
    ) VALUES (
      '${cwd}',
      '${description}'
    );
  `,
  completeTask: (description) => `
    UPDATE tasks
    SET completed_at = ${Date.now()}
    WHERE description LIKE '%${description}%';
  `,
  clearTasks: (cwd) => `
    DELETE FROM tasks
    WHERE working_directory = '${cwd}'
    AND completed_at IS NOT NULL;
  `,
  listTasks: (cwd) => `
    SELECT *
    FROM tasks
    WHERE working_directory = '${cwd}'
    ORDER BY completed_at;
  `,
  setup: () => `
    CREATE TABLE IF NOT EXISTS tasks (
      id integer primary key,
      working_directory text,
      description text,
      completed_at integer
    );
  `,
  hasTable: () => `
    SELECT name
    FROM sqlite_master
    WHERE type='table'
    AND name='tasks';
  `
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tasks [OPTIONS]

  Options
    --add, -a MESSAGE          Add a task.
    --complete, -c PATTERN     Mark all matching tasks as completed.
    --clear                    Clear all tasks marked as completed.
`, {
  description: 'Project task manager.',
  flags: {
    add: {
      type: 'string',
      alias: 'a'
    },
    complete: {
      type: 'string',
      alias: 'c'
    },
    clear: {
      type: 'boolean'
    }
  }
});

/**
 * Define script
 */

async function tasks(command=null) {
  showHelp(cli);

  const db = new Database(dbPath, queries);

  try {
    if (arguments.length === 0) console.log('\nProject:', cwd, '\n');

    if (cli.flags.add || cli.flags.a) {
      console.log('  Creating a task...');
      await db.addTask(cwd, cli.flags.add);
    } else if (cli.flags.complete || cli.flags.c) {
      console.log('  Marking task as done...');
      await db.completeTask(cli.flags.complete);
    } else if (cli.flags.clear) {
      console.log('  Clearing all tasks marked as done...');
      await db.clearTasks();
    } else {
      console.log('  Tasks:');
      const [tasks, _] = await db.listTasks();
      for (let i = 0; i < tasks.length; i++) {
        if (arguments.length === 0) console.log(`    ${tasks[i].completed_at ? 
          chalk.green('\u2713') : chalk.white('\u25A2')}  ${tasks[i].description}`);
      }
    }
  } catch(err) {
    console.error(err);
  } finally {
    await db.close();
  }
}

/**
 * Export script
 */

module.exports = tasks;

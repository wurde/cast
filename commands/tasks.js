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

const DB_PATH = path.join(process.env.HOME, '.tasks.sqlite3');
const QUERIES = {
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
  createTable: () => `
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
 * Define helpers
 */

async function createTableIfMissing(db) {
  const [results, _] = await db.exec('hasTable');
  if (results.length === 0) await db.exec('createTable');
}

async function listAllTasks(db, cwd, quiet) {
  const [tasks, _] = await db.exec('listTasks', [cwd]);

  if (!quiet) {
    for (let i = 0; i < tasks.length; i++) {
      console.log(
        `    ${
          tasks[i].completed_at
            ? chalk.green('\u2713')
            : chalk.white('\u25A2')
        }  ${tasks[i].description}`
      );
    }
  }

  return JSON.stringify(tasks);
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast tasks [OPTIONS]

  Options
    --add, -a MESSAGE          Add a task.
    --complete, -c MESSAGE     Mark all matching tasks as completed.
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
    clear: { type: 'boolean' },
  }
});

/**
 * Define script
 */

async function tasks(command = null, options = {}) {
  showHelp(cli);

  const cwd = options.cwd || process.cwd();
  const db = new Database(DB_PATH, QUERIES);
  const quiet = (command) ? true : false;
  await createTableIfMissing(db);
  let message = options.message;

  if (!command) {
    if (cli.flags.add) {
      command = 'add';
      message = cli.flags.add;
    }
    if (cli.flags.complete) {
      command = 'complete';
      message = cli.flags.complete;
    }
    if (cli.flags.clear) command = 'clear';
  }

  if (command === 'add' || command === 'complete') {
    if (!message) throw new Error('Message is required.');
  }

  try {
    if (!quiet) console.log('\nProject:', cwd, '\n');

    if (command == 'add') {
      /**
       * Add a task.
       */

      if (!quiet) console.log('  Adding a task...');
      await db.exec('addTask', [cwd, message]);
      return await listAllTasks(db, cwd, quiet);
    } else if (command == 'complete') {
      /**
       * Mark all matching tasks as completed.
       */

      if (!quiet) console.log('  Marking task(s) as completed...');
      await db.exec('completeTask', [message]);
      return await listAllTasks(db, cwd, quiet);
    } else if (command == 'clear') {
      /**
       * Clear all tasks marked as completed.
       */

      if (!quiet) console.log('  Clearing all tasks marked as completed...');
      await db.exec('clearTasks', [cwd]);
      return await listAllTasks(db, cwd, quiet);
    } else {
      /**
       * List all tasks.
       */

      if (!quiet) console.log('  Tasks:');
      return await listAllTasks(db, cwd, quiet);
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

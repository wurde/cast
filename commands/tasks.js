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

async function listAllTasks(db, cwd) {
  const [tasks, _] = await db.exec('listTasks', [cwd]);

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

async function tasks(command = null, options = {}) {
  showHelp(cli);

  const cwd = options.cwd || process.cwd();
  const db = new Database(dbPath, queries);
  await createTableIfMissing(db);

  if (!command) {
    if (cli.flags.add) command = 'add';
    if (cli.flags.complete) command = 'complete';
    if (cli.flags.clear) command = 'clear';
  }

  try {
    console.log('\nProject:', cwd, '\n');

    if (command == 'add') {
      /**
       * Add a task.
       */

      console.log('  Adding a task...');
      await db.exec('addTask', [cwd, cli.flags.add]);
      await listAllTasks(db, cwd);
    } else if (command == 'complete') {
      /**
       * Mark all matching tasks as completed.
       */

      console.log('  Marking task(s) as completed...');
      await db.exec('completeTask', [cli.flags.complete]);
      await listAllTasks(db, cwd);
    } else if (command == 'clear') {
      /**
       * Clear all tasks marked as completed.
       */

      console.log('  Clearing all tasks marked as completed...');
      await db.exec('clearTasks', [cwd]);
      await listAllTasks(db, cwd);
    } else {
      /**
       * List all tasks.
       */

      console.log('  Tasks:');
      await listAllTasks(db, cwd);
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

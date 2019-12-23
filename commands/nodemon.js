'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const fse = require('fs-extra');
const chokidar = require('chokidar');
const child_process = require('child_process');
const showHelp = require('../helpers/showHelp');
const kill = require('../helpers/kill');

/**
 * Constants
 */

const CONFIG_DIR = path.join(process.env.HOME, '.nodemon');

/**
 * Define helpers
 */

async function runInBackground() {
  const p = child_process.spawn('cast', ['nodemon', '--start'], {
    detached: true,
    stdio: 'ignore',
  });

  p.unref();
}

function startNodemon() {
  const pid_file = path.join(CONFIG_DIR, '.pid');

  if (fs.existsSync(pid_file)) return;
  fs.writeFileSync(pid_file, process.pid);

  chokidar
    .watch(`${CONFIG_DIR}/*.js`)
    .on('add', file => startProcess(file))
    .on('unlink', file => stopProcess(file))
    .on('change', file => restartProcess(file));
}

function startProcess(file) {
  const basename = path.basename(file, path.extname(file));
  const pid_file = path.join(CONFIG_DIR, `${basename}.pid`);

  const p = child_process.fork(file, {
    execArgv: [`--title=nodemon/${basename}`]
  });

  fs.writeFileSync(pid_file, p.pid);
}

function stopProcess(file) {
  const pid_file = buildPidFile(file);

  if (fs.existsSync(pid_file)) {
    const status = kill(fs.readFileSync(pid_file, { encoding: 'utf8' }), '-SIGTERM');
    fs.unlinkSync(pid_file);
  }
}

function restartProcess(file) {
  stopProcess(file);
  startProcess(file);
}

function buildPidFile(file) {
  const basename = path.basename(file, path.extname(file));
  return path.join(CONFIG_DIR, `${basename}.pid`);
}

function printInitialPrompt() {
  console.log('\n  No monitoring scripts found. Add your first one.');
}

function printUsageRef() {
  console.log('\n  To see usage run \`cast nodemon -h\`\n');
}

function requireFile(file) {
  if (!fse.pathExistsSync(file)) throw new Error(`Missing file ${file}`);
}

function requireExtname(file, ext) {
  if (path.extname(file) !== ext)
    throw new Error('Invalid file missing .js extension.');
}

function requireFileFormat(file) {
  requireFile(file);
  requireExtname(file, '.js');
}

function printScripts(files) {
  console.log('\n  Listing active nodemon scripts...\n');
  for (let i = 0; i < files.length; i++) {
    console.log(`    ${chalk.bold.green(files[i][0])}`);
    console.log(`    ${files[i][1]}`);
    console.log('');
  }
}

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast nodemon
  
  Options:
    -a, --add FILE   Add a new monitoring script.
    --remove FILE    Remove a monitoring script.
`, {
  description: 'Filesystem monitoring scripts.',
  flags: {
    add: { type: 'string', alias: 'a' },
    remove: { type: 'string' },
  }
});

/**
 * Define script
 */

function nodemon(command = null) {
  showHelp(cli);

  process.title = 'nodemon';
  const flags = Object.keys(cli.flags);
  command = command || flags.pop() || 'list';

  fse.mkdirpSync(CONFIG_DIR);

  if (command === 'list' || command === 'l') {
    console.log('LIST')
    const files = fs
      .readdirSync(CONFIG_DIR, { withFileTypes: true })
      .filter(f => f.isSymbolicLink())
      .map(f => [f.name, path.resolve(CONFIG_DIR, fs.readlinkSync(path.join(CONFIG_DIR, f.name)))]);

    if (files.length > 0) {
      printScripts(files);
      printUsageRef();
    } else {
      printInitialPrompt();
      printUsageRef();
    }
  } else if (command === 'add' || command === 'a') {
    console.log('ADD')
    const file = cli.flags.add;
    const dst = path.join(CONFIG_DIR, path.basename(file));
    requireFileFormat(file);

    console.log(chalk.white.bold(`\n  Adding script: ${dst}\n`));
    fse.ensureSymlinkSync(file, dst);
  } else if (command === 'remove') {
    console.log('REMOVE')
    const file = cli.flags.remove;
    const dst = path.join(CONFIG_DIR, file);
    requireFileFormat(dst);

    console.log(chalk.white.bold(`\n  Removing script: ${dst}\n`));
    fs.unlinkSync(dst);    
  }

  console.log('command', command, flags);
  if (command === 'start') {
    console.log('startNodemon');
    startNodemon();
  } else {
    console.log('runInBackground');
    runInBackground();
  }
}

/**
 * Export script
 */

module.exports = nodemon;

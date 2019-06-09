'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const Listr = require('listr')

/**
 * Define class
 */

class InitSqliteSimple {
  constructor(args) {
    this.args = args
  }

  run() {
    console.log('')

    let tasks = new Listr([
      { title: 'set_context()', task: this.set_context },
      { title: 'add_editorconfig()', task: this.add_editorconfig },
      { title: 'add_readme()', task: this.add_readme },
      { title: 'add_gitignore()', task: this.add_gitignore },
      { title: 'add_package_json()', task: this.add_package_json },
      { title: 'add_tmp_dir()', task: this.add_tmp_dir },
      { title: 'add_log_dir()', task: this.add_log_dir },
      { title: 'add_db_dir()', task: this.add_db_dir },
      { title: 'add_index_js()', task: this.add_index_js },
      { title: 'npm_install_deps()', task: this.npm_install_deps },
      { title: 'git_commit_init()', task: this.git_commit_init },
    ])

    tasks.run().catch(err => {
      console.error(err)
    })
  }

  set_context(ctx) {
    ctx.cwd = process.cwd()
    ctx.cwd_basename = path.basename(ctx.cwd)
  }

  add_editorconfig() {
    if (!fs.existsSync('.editorconfig')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.editorconfig'), '.editorconfig') }
  }

  add_readme(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'all-purpose', 'README.md'), 'utf8')
    text = text.replace('__TITLE__', ctx.cwd_basename)
    text = text.replace('__DESCRIPTION__', 'A sandbox for SQLite code.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'package.json'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('package.json')) { fs.writeFileSync('package.json', text) }
  }

  add_tmp_dir() {
    if (!fs.existsSync('tmp')) { fs.mkdirSync('tmp') }
    if (!fs.existsSync('tmp/.keep')) { fs.writeFileSync('tmp/.keep', '') }
  }

  add_log_dir() {
    if (!fs.existsSync('log')) { fs.mkdirSync('log') }
    if (!fs.existsSync('log/.keep')) { fs.writeFileSync('log/.keep', '') }
  }

  add_db_dir() {
    if (!fs.existsSync('db')) { fs.mkdirSync('db') }
    if (!fs.existsSync('db/migrations')) { fs.mkdirSync('db/migrations') }
    if (!fs.existsSync('db/seeds')) { fs.mkdirSync('db/seeds') }

    if (!fs.existsSync('db/schema.sql')) { fs.copyFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'db', 'schema.sql'), 'db/schema.sql') }
    if (!fs.existsSync('db/development.sqlite')) { fs.copyFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'db', 'development.sqlite'), 'db/development.sqlite') }
    if (!fs.existsSync('db/migrations/201904220518_create_schema_migrations.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'db', 'migrations', '201904220518_create_schema_migrations.js'), 'db/migrations/201904220518_create_schema_migrations.js') }
    if (!fs.existsSync('db/seeds/development_seed.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'db', 'seeds', 'development_seed.js'), 'db/seeds/development_seed.js') }
  }

  add_index_js() {
    if (!fs.existsSync('index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'sqlite-simple', 'index.js'), 'index.js') }
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install sqlite3 --save --loglevel=error')
      child_process.execSync('npm install nodemon --save-dev --loglevel=error')
    }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitSqliteSimple

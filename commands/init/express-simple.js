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

class InitExpressSimple {
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
      { title: 'add_index_js()', task: this.add_index_js },
      { title: 'add_test_dir()', task: this.add_test_dir },
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
    text = text.replace('__DESCRIPTION__', 'A simple express app.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'express-simple', 'package.json'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('package.json')) { fs.writeFileSync('package.json', text) }
  }

  add_index_js() {
    if (!fs.existsSync('index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-simple', 'index.js'), 'index.js') }
  }

  add_test_dir() {
    if (!fs.existsSync('test')) { fs.mkdirSync('test') }
    if (!fs.existsSync('test/app_test.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-simple', 'test', 'app_test.js'), 'test/app_test.js') }
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install express --loglevel=error')
      child_process.execSync('npm install nodemon ava puppeteer --save-dev --loglevel=error')
    }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitExpressSimple

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

class InitLessSimple {
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
      { title: 'add_index_html()', task: this.add_index_html },
      { title: 'add_index_less()', task: this.add_index_less },
      { title: 'add_public_dir()', task: this.add_public_dir },
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
    text = text.replace('__DESCRIPTION__', 'A sandbox for LESS code.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'less-simple', 'package.json'), 'utf8')
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

  add_index_html(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'all-purpose', 'index.html'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('index.html')) { fs.writeFileSync('index.html', text) }
  }

  add_index_less() {
    fs.mkdirSync('less')
    fs.writeFileSync('less/index.less', '// Import LESS stylesheets\n')
  }

  add_public_dir() {
    fs.mkdirSync('public')
    fs.writeFileSync('public/.keep')
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install live-server less-watch-compiler --save-dev --loglevel=error')
    }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitLessSimple

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

class InitSassSimple {
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
      { title: 'add_index_html()', task: this.add_index_html },
      { title: 'add_global_styles()', task: this.add_global_styles },
      { title: 'add_public_dir()', task: this.add_public_dir },
      { title: 'npm_install_deps()', task: this.npm_install_deps },
      { title: 'npm_run_build()', task: this.npm_run_build },
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
    text = text.replace('__DESCRIPTION__', 'A sandbox for SASS code.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'sass-simple', 'package.json'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('package.json')) { fs.writeFileSync('package.json', text) }
  }

  add_index_html(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'all-purpose', 'index.html'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('index.html')) { fs.writeFileSync('index.html', text) }
  }

  add_global_styles() {
    if (!fs.existsSync('sass')) { fs.mkdirSync('sass') }
    if (!fs.existsSync('sass/global')) { fs.mkdirSync('sass/global') }
    if (!fs.existsSync('sass/grid')) { fs.mkdirSync('sass/grid') }

    if (!fs.existsSync('sass/index.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'index.scss'), 'sass/index.scss') }
    if (!fs.existsSync('sass/variables.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'variables.scss'), 'sass/variables.scss') }
    if (!fs.existsSync('sass/global/reset.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'global', 'reset.scss'), 'sass/global/reset.scss') }
    if (!fs.existsSync('sass/global/reboot.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'global', 'reboot.scss'), 'sass/global/reboot.scss') }
    if (!fs.existsSync('sass/grid/flex.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'flex.scss'), 'sass/grid/flex.scss') }
    if (!fs.existsSync('sass/grid/grid.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'grid.scss'), 'sass/grid/grid.scss') }
    if (!fs.existsSync('sass/grid/spacing.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'spacing.scss'), 'sass/grid/spacing.scss') }
  }

  add_public_dir() {
    if (!fs.existsSync('public')) { fs.mkdirSync('public') }
    if (!fs.existsSync('public/.keep')) { fs.writeFileSync('public/.keep') }
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install live-server node-sass --save-dev --loglevel=error')
    }
  }

  npm_run_build() {
    if (!fs.existsSync('./public/css/index.css')) { child_process.execSync("npm run build") }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitSassSimple

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

class InitExpressTurbolinks {
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
      { title: 'add_config_dir()', task: this.add_config_dir },
      { title: 'add_app_dir()', task: this.add_app_dir },
      { title: 'add_lib_dir()', task: this.add_lib_dir },
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
    text = text.replace('__DESCRIPTION__', 'An express app using turbolinks.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'package.json'), 'utf8')
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

  add_config_dir() {
    if (!fs.existsSync('config')) { fs.mkdirSync('config') }
    if (!fs.existsSync('config/routes')) { fs.mkdirSync('config/routes') }

    if (!fs.existsSync('config/app.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'config', 'app.js'), 'config/app.js') }
    if (!fs.existsSync('config/routes/root_router.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'config', 'routes', 'root_router.js'), 'config/routes/root_router.js') }
  }

  add_app_dir() {
    if (!fs.existsSync('app')) { fs.mkdirSync('app') }
    if (!fs.existsSync('app/controllers')) { fs.mkdirSync('app/controllers') }
    if (!fs.existsSync('app/views')) { fs.mkdirSync('app/views') }
    if (!fs.existsSync('app/views/shared')) { fs.mkdirSync('app/views/shared') }

    if (!fs.existsSync('app/controllers/root_controller.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'app', 'controllers', 'root_controller.js'), 'app/controllers/root_controller.js') }
    if (!fs.existsSync('app/views/index.html.ejs')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'app', 'views', 'index.html.ejs'), 'app/views/index.html.ejs') }
    if (!fs.existsSync('app/views/error.html.ejs')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'app', 'views', 'error.html.ejs'), 'app/views/error.html.ejs') }
    if (!fs.existsSync('app/views/shared/_head.html.ejs')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'app', 'views', 'shared', '_head.html.ejs'), 'app/views/shared/_head.html.ejs') }
    if (!fs.existsSync('app/views/shared/_js_required_warning.html.ejs')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'app', 'views', 'shared', '_js_required_warning.html.ejs'), 'app/views/shared/_js_required_warning.html.ejs') }
  }

  add_lib_dir() {
    if (!fs.existsSync('lib')) { fs.mkdirSync('lib') }
    if (!fs.existsSync('lib/middleware')) { fs.mkdirSync('lib/middleware') }
    if (!fs.existsSync('lib/middleware/errors')) { fs.mkdirSync('lib/middleware/errors') }
    if (!fs.existsSync('lib/middleware/parsers')) { fs.mkdirSync('lib/middleware/parsers') }

    if (!fs.existsSync('lib/middleware/errors/page_not_found.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'lib', 'middleware', 'errors', 'page_not_found.js'), 'lib/middleware/errors/page_not_found.js') }
    if (!fs.existsSync('lib/middleware/errors/render_error.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'lib', 'middleware', 'errors', 'render_error.js'), 'lib/middleware/errors/render_error.js') }
    if (!fs.existsSync('lib/middleware/parsers/json_body_parser.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'lib', 'middleware', 'parsers', 'json_body_parser.js'), 'lib/middleware/parsers/json_body_parser.js') }
    if (!fs.existsSync('lib/middleware/parsers/urlencoded_body_parser.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'lib', 'middleware', 'parsers', 'urlencoded_body_parser.js'), 'lib/middleware/parsers/urlencoded_body_parser.js') }
  }

  add_test_dir() {
    if (!fs.existsSync('test')) { fs.mkdirSync('test') }

    if (!fs.existsSync('test/features')) { fs.mkdirSync('test/features') }
    if (!fs.existsSync('test/features/root_router')) { fs.mkdirSync('test/features/root_router') }
    if (!fs.existsSync('test/features/root_router/root_content_test.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'express-turbolinks', 'test', 'features', 'root_router', 'root_content_test.js'), 'test/features/root_router/root_content_test.js') }

    if (!fs.existsSync('test/helpers')) { fs.mkdirSync('test/helpers') }
    if (!fs.existsSync('test/helpers/hesitate.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'hesitate.js'), 'test/helpers/hesitate.js') }
    if (!fs.existsSync('test/helpers/init_page.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'init_page.js'), 'test/helpers/init_page.js') }
    if (!fs.existsSync('test/helpers/visit.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'visit.js'), 'test/helpers/visit.js') }
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install express ejs --save --loglevel=error')
      child_process.execSync('npm install nodemon ava puppeteer turbolinks --save-dev --loglevel=error')
    }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitExpressTurbolinks

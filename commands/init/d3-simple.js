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

class InitD3Simple {
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
      { title: 'add_webpack_config()', task: this.add_webpack_config },
      { title: 'add_tmp_dir()', task: this.add_tmp_dir },
      { title: 'add_log_dir()', task: this.add_log_dir },
      { title: 'add_client_dir()', task: this.add_client_dir },
      { title: 'add_global_styles()', task: this.add_global_styles },
      { title: 'add_server_dir()', task: this.add_server_dir },
      { title: 'add_test_dir()', task: this.add_test_dir },
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
    text = text.replace('__DESCRIPTION__', 'A simple React app for D3 visualizations.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'd3-simple', 'package.json'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('package.json')) { fs.writeFileSync('package.json', text) }
  }

  add_webpack_config() {
    if (!fs.existsSync('webpack.config.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'webpack.config.js'), 'webpack.config.js') }
  }

  add_tmp_dir() {
    if (!fs.existsSync('tmp')) { fs.mkdirSync('tmp') }
    if (!fs.existsSync('tmp/.keep')) { fs.writeFileSync('tmp/.keep', '') }
  }

  add_log_dir() {
    if (!fs.existsSync('log')) { fs.mkdirSync('log') }
    if (!fs.existsSync('log/.keep')) { fs.writeFileSync('log/.keep', '') }
  }

  add_client_dir() {
    if (!fs.existsSync('client')) { fs.mkdirSync('client') }

    if (!fs.existsSync('client/dist')) { fs.mkdirSync('client/dist') }
    if (!fs.existsSync('client/dist/.keep')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'dist', '.keep'), 'client/dist/.keep') }

    if (!fs.existsSync('client/public')) { fs.mkdirSync('client/public') }
    if (!fs.existsSync('client/public/index.html')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'public', 'index.html'), 'client/public/index.html') }

    if (!fs.existsSync('client/src')) { fs.mkdirSync('client/src') }
    if (!fs.existsSync('client/src/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'index.js'), 'client/src/index.js') }
    if (!fs.existsSync('client/src/App.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'App.js'), 'client/src/App.js') }
    if (!fs.existsSync('client/src/App.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'App.scss'), 'client/src/App.scss') }

    if (!fs.existsSync('client/src/components')) { fs.mkdirSync('client/src/components') }
    if (!fs.existsSync('client/src/components/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'components', 'index.js'), 'client/src/components/index.js') }

    if (!fs.existsSync('client/src/components/Title')) { fs.mkdirSync('client/src/components/Title') }
    if (!fs.existsSync('client/src/components/Title/Title.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Title', 'Title.js'), 'client/src/components/Title/Title.js') }
    if (!fs.existsSync('client/src/components/Title/styles')) { fs.mkdirSync('client/src/components/Title/styles') }
    if (!fs.existsSync('client/src/components/Title/styles/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Title', 'styles', 'index.js'), 'client/src/components/Title/styles/index.js') }
    if (!fs.existsSync('client/src/components/Title/styles/TitleStyle.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Title', 'styles', 'TitleStyle.js'), 'client/src/components/Title/styles/TitleStyle.js') }

    if (!fs.existsSync('client/src/components/Error')) { fs.mkdirSync('client/src/components/Error') }
    if (!fs.existsSync('client/src/components/Error/ErrorBoundary.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'ErrorBoundary.js'), 'client/src/components/Error/ErrorBoundary.js') }
    if (!fs.existsSync('client/src/components/Error/Error500.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'Error500.js'), 'client/src/components/Error/Error500.js') }
    if (!fs.existsSync('client/src/components/Error/Error404.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'Error404.js'), 'client/src/components/Error/Error404.js') }
    if (!fs.existsSync('client/src/components/Error/styles')) { fs.mkdirSync('client/src/components/Error/styles') }
    if (!fs.existsSync('client/src/components/Error/styles/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'styles', 'index.js'), 'client/src/components/Error/styles/index.js') }
    if (!fs.existsSync('client/src/components/Error/styles/ErrorBoundaryStyle.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'styles', 'ErrorBoundaryStyle.js'), 'client/src/components/Title/styles/ErrorBoundaryStyle.js') }
    if (!fs.existsSync('client/src/components/Error/styles/Error404Style.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'styles', 'Error404Style.js'), 'client/src/components/Title/styles/Error404Style.js') }
    if (!fs.existsSync('client/src/components/Error/styles/Error500Style.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'client', 'src', 'components', 'Error', 'styles', 'Error500Style.js'), 'client/src/components/Title/styles/Error500Style.js') }

    if (!fs.existsSync('client/src/components/Visualization')) { fs.mkdirSync('client/src/components/Visualization') }
    if (!fs.existsSync('client/src/components/Visualization/Visualization.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'components', 'Visualization', 'Visualization.js'), 'client/src/components/Visualization/Visualization.js') }
    if (!fs.existsSync('client/src/components/Visualization/styles')) { fs.mkdirSync('client/src/components/Visualization/styles') }
    if (!fs.existsSync('client/src/components/Visualization/styles/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'components', 'Visualization', 'styles', 'index.js'), 'client/src/components/Visualization/styles/index.js') }
    if (!fs.existsSync('client/src/components/Visualization/styles/VisualizationStyle.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'client', 'src', 'components', 'Visualization', 'styles', 'VisualizationStyle.js'), 'client/src/components/Visualization/styles/VisualizationStyle.js') }
  }

  add_global_styles() {
    if (!fs.existsSync('client/src/styles')) { fs.mkdirSync('client/src/styles') }
    if (!fs.existsSync('client/src/styles/global')) { fs.mkdirSync('client/src/styles/global') }
    if (!fs.existsSync('client/src/styles/grid')) { fs.mkdirSync('client/src/styles/grid') }

    if (!fs.existsSync('client/src/styles/index.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'index.scss'), 'client/src/styles/index.scss') }
    if (!fs.existsSync('client/src/styles/variables.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'variables.scss'), 'client/src/styles/variables.scss') }
    if (!fs.existsSync('client/src/styles/global/reset.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'global', 'reset.scss'), 'client/src/styles/global/reset.scss') }
    if (!fs.existsSync('client/src/styles/global/reboot.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'global', 'reboot.scss'), 'client/src/styles/global/reboot.scss') }
    if (!fs.existsSync('client/src/styles/grid/flex.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'flex.scss'), 'client/src/styles/grid/flex.scss') }
    if (!fs.existsSync('client/src/styles/grid/grid.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'grid.scss'), 'client/src/styles/grid/grid.scss') }
    if (!fs.existsSync('client/src/styles/grid/spacing.scss')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'styles', 'grid', 'spacing.scss'), 'client/src/styles/grid/spacing.scss') }
  }

  add_server_dir() {
    if (!fs.existsSync('server')) { fs.mkdirSync('server') }
    if (!fs.existsSync('server/app.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'server', 'app.js'), 'server/app.js') }
  }

  add_test_dir() {
    if (!fs.existsSync('test')) { fs.mkdirSync('test') }

    if (!fs.existsSync('test/features')) { fs.mkdirSync('test/features') }
    if (!fs.existsSync('test/features/title_test')) { fs.copyFileSync(path.join(__dirname, 'files', 'd3-simple', 'test', 'features', 'title_test.js'), 'test/features/title_test.js') }

    if (!fs.existsSync('test/helpers')) { fs.mkdirSync('test/helpers') }
    if (!fs.existsSync('test/helpers/hesitate.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'hesitate.js'), 'test/helpers/hesitate.js') }
    if (!fs.existsSync('test/helpers/init_page.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'init_page.js'), 'test/helpers/init_page.js') }
    if (!fs.existsSync('test/helpers/visit.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', 'test', 'helpers', 'visit.js'), 'test/helpers/visit.js') }
  }

  /**
   * Dependencies:
   *
   * @babel/core
   *     Transpile ES6 code to ES5.
   * @babel/preset-env
   *     Determines which features needs to be transformed to run within
   *     different browsers or runtime versions. This is also known as
   *     browser polyfills.
   * @babel/preset-react
   *     Transform all your React JSX into functions.
   * babel-loader
   *     Webpack helper which allows to transpile Javascript files with babel
   *     and webpack.
   * style-loader
   *     Adds CSS to the DOM by injecting a <style> tag.
   * file-loader
   *     Resolves import/require() on a file into a url and emits the file
   *     into the output directory.
   * html-webpack-plugin
   *     Generates an HTML file, injects the <script>.
   */

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install express --save --loglevel=error')
      child_process.execSync(`\
        npm install react react-dom react-router-dom \
          webpack webpack-cli webpack-dev-server \
          babel-loader @babel/core @babel/preset-env @babel/preset-react babel-preset-react-app \
          style-loader css-loader sass-loader node-sass styled-components \
          file-loader \
          html-webpack-plugin \
          ava puppeteer \
          d3 --save-dev --loglevel=error
      `.trim().replace(/\s\s+/g, ' '))
    }
  }

  npm_run_build() {
    if (!fs.existsSync('./client/dist/index.html')) { child_process.execSync("npm run build") }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitD3Simple

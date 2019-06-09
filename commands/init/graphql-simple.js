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

class InitGraphqlSimple {
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
      { title: 'add_config_dir()', task: this.add_config_dir },
      { title: 'add_lib_dir()', task: this.add_lib_dir },
      { title: 'add_api_dir()', task: this.add_api_dir },
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
    text = text.replace('__DESCRIPTION__', 'A simple GraphQL API.')
    if (!fs.existsSync('README.md')) { fs.writeFileSync('README.md', text) }
  }

  add_gitignore() {
    if (!fs.existsSync('.gitignore')) { fs.copyFileSync(path.join(__dirname, 'files', 'all-purpose', '.gitignore'), '.gitignore') }
  }

  add_package_json(ctx) {
    let text = fs.readFileSync(path.join(__dirname, 'files', 'graphql-simple', 'package.json'), 'utf8')
    text = text.replace(/__TITLE__/g, ctx.cwd_basename)
    if (!fs.existsSync('package.json')) { fs.writeFileSync('package.json', text) }
  }

  add_config_dir() {
    if (!fs.existsSync('server')) { fs.mkdirSync('server') }
    if (!fs.existsSync('server/app.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'server', 'app.js'), 'server/app.js') }
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

  add_api_dir() {
    if (!fs.existsSync('api')) { fs.mkdirSync('api') }
    if (!fs.existsSync('api/schema.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'schema.js'), 'api/schema.js') }
    if (!fs.existsSync('api/QueryType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'QueryType.js'), 'api/QueryType.js') }
    if (!fs.existsSync('api/MutationType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'MutationType.js'), 'api/MutationType.js') }

    if (!fs.existsSync('api/field_config')) { fs.mkdirSync('api/field_config') }
    if (!fs.existsSync('api/field_config/query')) { fs.mkdirSync('api/field_config/query') }
    if (!fs.existsSync('api/field_config/query/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'query', 'index.js'), 'api/field_config/query/index.js') }
    if (!fs.existsSync('api/field_config/query/hello.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'query', 'hello.js'), 'api/field_config/query/hello.js') }
    if (!fs.existsSync('api/field_config/query/findPost.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'query', 'findPost.js'), 'api/field_config/query/findPost.js') }
    if (!fs.existsSync('api/field_config/query/allPosts.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'query', 'allPosts.js'), 'api/field_config/query/allPosts.js') }
    if (!fs.existsSync('api/field_config/mutation')) { fs.mkdirSync('api/field_config/mutation') }
    if (!fs.existsSync('api/field_config/mutation/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'mutation', 'index.js'), 'api/field_config/mutation/index.js') }
    if (!fs.existsSync('api/field_config/mutation/createPost.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'mutation', 'createPost.js'), 'api/field_config/mutation/createPost.js') }
    if (!fs.existsSync('api/field_config/mutation/deletePost.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'mutation', 'deletePost.js'), 'api/field_config/mutation/deletePost.js') }
    if (!fs.existsSync('api/field_config/mutation/updatePost.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'field_config', 'mutation', 'updatePost.js'), 'api/field_config/mutation/updatePost.js') }

    if (!fs.existsSync('api/inputs')) { fs.mkdirSync('api/inputs') }
    if (!fs.existsSync('api/inputs/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'inputs', 'index.js'), 'api/inputs/index.js') }
    if (!fs.existsSync('api/inputs/CreatePostInputType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'inputs', 'CreatePostInputType.js'), 'api/inputs/CreatePostInputType.js') }
    if (!fs.existsSync('api/inputs/DeletePostInputType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'inputs', 'DeletePostInputType.js'), 'api/inputs/DeletePostInputType.js') }
    if (!fs.existsSync('api/inputs/UpdatePostInputType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'inputs', 'UpdatePostInputType.js'), 'api/inputs/UpdatePostInputType.js') }

    if (!fs.existsSync('api/interfaces')) { fs.mkdirSync('api/interfaces') }
    if (!fs.existsSync('api/interfaces/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'interfaces', 'index.js'), 'api/interfaces/index.js') }

    if (!fs.existsSync('api/payloads')) { fs.mkdirSync('api/payloads') }
    if (!fs.existsSync('api/payloads/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'payloads', 'index.js'), 'api/payloads/index.js') }
    if (!fs.existsSync('api/payloads/CreatePostPayloadType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'payloads', 'CreatePostPayloadType.js'), 'api/payloads/CreatePostPayloadType.js') }
    if (!fs.existsSync('api/payloads/DeletePostPayloadType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'payloads', 'DeletePostPayloadType.js'), 'api/payloads/DeletePostPayloadType.js') }
    if (!fs.existsSync('api/payloads/UpdatePostPayloadType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'payloads', 'UpdatePostPayloadType.js'), 'api/payloads/UpdatePostPayloadType.js') }

    if (!fs.existsSync('api/scalars')) { fs.mkdirSync('api/scalars') }
    if (!fs.existsSync('api/scalars/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'scalars', 'index.js'), 'api/scalars/index.js') }

    if (!fs.existsSync('api/types')) { fs.mkdirSync('api/types') }
    if (!fs.existsSync('api/types/index.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'types', 'index.js'), 'api/types/index.js') }
    if (!fs.existsSync('api/types/PostType.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'api', 'types', 'PostType.js'), 'api/types/PostType.js') }
  }

  add_test_dir() {
    if (!fs.existsSync('test')) { fs.mkdirSync('test') }

    if (!fs.existsSync('test/mutations.test.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'test', 'mutations.test.js'), 'test/mutations.test.js') }
    if (!fs.existsSync('test/queries.test.js')) { fs.copyFileSync(path.join(__dirname, 'files', 'graphql-simple', 'test', 'queries.test.js'), 'test/queries.test.js') }
  }

  npm_install_deps() {
    if (!fs.existsSync('package-lock.json')) {
      child_process.execSync('npm install express express-graphql graphql cors --save --loglevel=error')
      child_process.execSync('npm install nodemon jest axios --save-dev --loglevel=error')
    }
  }

  git_commit_init() {
    if (!fs.existsSync('.git')) { child_process.execSync("git init; git add -A; git commit -m 'init'") }
  }
}

/**
 * Export class
 */

module.exports = InitGraphqlSimple

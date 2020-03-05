'use strict'

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const mkdir = require("../helpers/mkdir");
const npm = require("../helpers/npm");
const git = require("../helpers/git");

const templates = [
  "LICENSE",
  ".editorconfig",
  "server.js",
  "tsconfig.json",
  "webpack.config.js"
];

function main() {
  console.log(chalk.white.bold(`
    /////////////////
    Generator:`, chalk.green.bold('webdev\n')
  ));

  // Check if .git/ already exists.
  if (fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.error(chalk.red.bold('Project already exists. Found a .git/ directory.'))
    process.exit(1);
  }

  // Copying templates.
  for (const template of templates) {
    console.log(`    Copying ${chalk.white.bold(template)} .`);
    fs.copyFileSync(path.join(__dirname, "../templates", template), template);
  }

  // Write files:
  //   package.json
  //   Dockerfile

  // Write public index.html file.
  mkdir("public");
  fs.writeFileSync("public/index.html", `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My App</title>
  </head>
  <body>
    <my-app></my-app>
    <script src="./index.js" type="module"></script>
  </body>
</html>
  `);

  // Write source index.ts file.
  mkdir("src");
  fs.writeFileSync("src/index.ts", `
import { html, css, LitElement } from 'lit-element';

export class FooBar extends LitElement {
  static get styles() {
    return css\`
      :host {
        --foo-bar-text-color: #000;

        display: block;
        padding: 25px;
        color: var(--foo-bar-text-color);
      }
    \`;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.counter = 5;
  }

  __increment() {
    this.counter += 1;
  }

  render() {
    return html\`
      <h2>$\{this.title} Nr. $\{this.counter}!</h2>
      <button @click=$\{this.__increment}>increment</button>
    \`;
  }
}
  `);

  // Npm install.
  npm(["install"]);

  // Git init commit.
  git(["init", "--quiet"]);
}

module.exports = main();

'use strict'

const fs = require('fs');
const path = require('path');
const child_process = require("child_process");
const chalk = require('chalk');
const mkdir = require("../helpers/mkdir");
const npm = require("../helpers/npm");
const git = require("../helpers/git");

const templates = [
  "LICENSE",
  ".editorconfig",
  ".gitignore",
  "server.js",
  "tsconfig.json",
  "webpack.config.js"
];
const devDependencies = [
  "concurrently",
  "express",
  "lit-element",
  "nodemon",
  "rimraf",
  "ts-loader",
  "typescript",
  "webpack",
  "webpack-cli",
];
const package_json = {
  name: "my-app",
  version: "0.0.0",
  description: "My app description.",
  private: true,
  scripts: {
    prebuild: "rimraf dist",
    build: "tsc --project tsconfig.json && npm run webpack",
    "build:dev": "nodemon --exec 'npm run build' --watch src --ext ts,js",
    webpack: "webpack-cli --config webpack.config.js --mode production --entry ./dist/index.js --output ./public/index.js",
    start: "node server.js",
    "start:dev": "nodemon server.js",
    dev: "concurrently 'npm run build:dev' 'npm run start:dev'"
  },
  author: "Andy Bettisworth",
  license: "MIT"
};

function main() {
  const name = child_process.execSync("git config --get user.name", { encoding: 'utf8' });

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

  // Insert date and name for LICENSE.
  let license = fs.readFileSync("LICENSE", "utf8");
  license = license.replace(/YYYY/, new Date().getFullYear());
  if (name) { license = license.replace(/COPYRIGHT_HOLDER/, name); }
  fs.writeFileSync("LICENSE", license, "utf8")

  // Write package.json
  console.log(`    Copying ${chalk.white.bold("package.json")} .`);
  fs.writeFileSync("package.json", JSON.stringify(package_json));

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
import { LitElement, html, css, property, customElement } from 'lit-element';

@customElement('my-app')
export class MyApp extends LitElement {
  @property({ type: Number }) counter = 5
  @property({ type: String }) title = "Hey there"

  static styles = css\`
    :host {
      --foo-bar-text-color: #000;

      display: block;
      padding: 25px;
      color: var(--foo-bar-text-color);
    }
  \`;

  increment() {
    this.counter += 1;
  }

  render() {
    return html\`
      <h2>$\{this.title} Nr. $\{this.counter}!</h2>
      <button @click=$\{this.increment}>increment</button>
    \`;
  }
}
  `);

  // Npm install development dependencies.
  for (const pkg of devDependencies) {
    console.log(`\n    Install development dependencies...\n`);
    npm(["install", "--silent", "--save-dev", pkg]);
  }

  // Git init commit.
  git(["init", "--quiet"]);
}

module.exports = main();

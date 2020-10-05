"use strict";

/**
 * Dependencies
 */

const fs = require("fs");
const chalk = require("chalk");
const meow = require("meow");
const showHelp = require("../helpers/showHelp");
const npm = require("../helpers/npm");
const child_process = require("child_process");

/**
 * Parse args
 */

const cli = meow(
  `
  Usage
    $ cast babel-init 
  
  Options 
    --stage, -s Specify which stage of features you want supported (0-3) -- defaults to stage 0.
`,
  {
    description:
      "Bootstrap a babel project with support for stage-0 and above features.",
    flags: {
      stage: { type: "string", alias: "s" },
    },
  }
);

/**
 * Define script
 */

// TODO: prompt user for Typescript boilerplate generation
function babel() {
  sequenceSideEffects(
    () => showHelp(cli),

    // Write to package.json
    // ---------------------------------------
    () => npm(["init", "-y"]),

    () => console.log(chalk.cyan.bold("Installing dependencies...")),
    () =>
      npm([
        "install",
        "--save-dev",
        "@babel/cli",
        "@babel/core",
        "babel-upgrade",
      ]),
    () => npm(["install", "--save", "@babel/polyfill"]),

    () => installBabelPresetToPackageDotJson(cli.flags.stage),
    () => addRequiredTC39ProposalsToPackageDotJson(),
    () => addCompileScriptToPackageDotJson(),
    // ---------------------------------------

    // Write to babel.config.json
    // ---------------------------------------
    () => console.log(chalk.cyan.bold("Configuring a Babel file...\n\n")),
    () => addBabelConfig(cli.flags.stage),
    // ---------------------------------------

    () =>
      console.log(
        chalk.green.bold(
          `Your stage-${
            cli.flags.stage || "0"
          } Babel project has been bootstrapped! Run "npm run compile" to compile your project.`
        )
      )
  );
}

/**
 * Helpers
 */

// Run a series of side effects, synchronously, in sequential order.
function sequenceSideEffects(...sideEffects) {
  sideEffects.forEach((sideEffect) => sideEffect());
}

function installBabelPresetToPackageDotJson(stage = "0") {
  switch (stage) {
    case "0":
      npm(["install", "--save-dev", "@babel/preset-stage-0"]);
      // Include the experimental pipeline operator
      npm([
        "install",
        "--save-dev",
        "@babel/plugin-proposal-pipeline-operator",
      ]);
      break;
    case "1":
      npm(["install", "--save-dev", "@babel/preset-stage-1"]);
      // Include the experimental pipeline operator (since it's currently a stage-1 proposal)
      npm([
        "install",
        "--save-dev",
        "@babel/plugin-proposal-pipeline-operator",
      ]);
      break;
    case "2":
      npm(["install", "--save-dev", "@babel/preset-stage-2"]);
      break;
    case "3":
      npm(["install", "--save-dev", "@babel/preset-stage-3"]);
      break;
    default:
      npm(["install", "--save-dev", "@babel/preset-stage-0"]);
  }
}

function addCompileScriptToPackageDotJson() {
  const packageDotJson = JSON.parse(
    fs.readFileSync("./package.json", {
      encoding: "utf-8",
    })
  );
  packageDotJson.scripts.compile =
    "node ./node_modules/.bin/babel src --out-dir dist";

  fs.writeFileSync("./package.json", JSON.stringify(packageDotJson, null, 2));
}

function addBabelConfig(stage = "0") {
  const plugins = {
    stage0: [
      // Stage 0
      "@babel/plugin-proposal-function-bind",

      // Stage 1
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      ["@babel/plugin-proposal-optional-chaining", { loose: false }],
      ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
      ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
      "@babel/plugin-proposal-do-expressions",

      // Stage 2
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",

      // Stage 3
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      ["@babel/plugin-proposal-class-properties", { loose: false }],
      "@babel/plugin-proposal-json-strings",
    ],
    stage1: [
      // Stage 1
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-logical-assignment-operators",
      ["@babel/plugin-proposal-optional-chaining", { loose: false }],
      ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
      ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
      "@babel/plugin-proposal-do-expressions",

      // Stage 2
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",

      // Stage 3
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      ["@babel/plugin-proposal-class-properties", { loose: false }],
      "@babel/plugin-proposal-json-strings",
    ],
    stage2: [
      // Stage 2
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-throw-expressions",

      // Stage 3
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      ["@babel/plugin-proposal-class-properties", { loose: false }],
      "@babel/plugin-proposal-json-strings",
    ],
    stage3: [
      // Stage 3
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      ["@babel/plugin-proposal-class-properties", { loose: false }],
      "@babel/plugin-proposal-json-strings",
    ],
  };

  switch (stage) {
    case "0":
      fs.writeFileSync(
        "babel.config.json",
        JSON.stringify({ plugins: plugins.stage0 }, null, 2)
      );
      break;
    case "1":
      fs.writeFileSync(
        "babel.config.json",
        JSON.stringify({ plugins: plugins.stage1 }, null, 2)
      );
      break;
    case "2":
      fs.writeFileSync(
        "babel.config.json",
        JSON.stringify({ plugins: plugins.stage2 }, null, 2)
      );
      break;
    case "3":
      fs.writeFileSync(
        "babel.config.json",
        JSON.stringify({ plugins: plugins.stage3 }, null, 2)
      );
      break;
    default:
      fs.writeFileSync(
        "babel.config.json",
        JSON.stringify({ plugins: plugins.stage0 }, null, 2)
      );
  }
}

// Upgrade the babel config to include an exhaustive list of all the proposals.
// This is the new standard for Babel 7.0 and above (babel-preset-x no longer suffices).
function addRequiredTC39ProposalsToPackageDotJson() {
  child_process.execSync("npx babel-upgrade --write");
  npm(["install"]);
}

/**
 * Export script
 */

module.exports = babel();

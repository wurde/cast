"use strict";

/**
 * Dependencies
 */

const fs = require("fs");
const chalk = require("chalk");
const meow = require("meow");
const showHelp = require("../helpers/showHelp");
const npm = require("../helpers/npm");

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
    () => npm(["install", "--save-dev", "@babel/cli", "@babel/core"]),
    () => npm(["install", "--save", "@babel/polyfill"]),

    () => installBabelPresetToPackageDotJson(cli.flags.stage),
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
  const defaultBabelConfig = {
    presets: ["@babel/preset-stage-0"],

    plugins: [
      ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
    ],
  };

  const writeBabelConfig = ({ config = defaultBabelConfig }) => {
    fs.writeFileSync("babel.config.json", JSON.stringify(config, null, 2));
  };

  const newBabelConfig = ({ stage = "0", plugins = [] }) => ({
    ...defaultBabelConfig,
    presets: ["@babel/preset-stage-" + stage],
    plugins: plugins,
  });

  switch (stage) {
    case "0":
      writeBabelConfig({ config: defaultBabelConfig });
      break;
    case "1":
      writeBabelConfig({
        config: newBabelConfig({
          stage: "1",
          plugins: defaultBabelConfig.plugins, // include the pipeline operator as a default plugin (since this operator is a stage-1 prposal)
        }),
      });
    case "2":
      writeBabelConfig({ config: newBabelConfig({ stage: "2" }) });
    case "3":
      writeBabelConfig({ config: newBabelConfig({ stage: "3" }) });
      break;
    default:
      // default to stage-0
      writeBabelConfig({ config: defaultBabelConfig });
  }
}

/**
 * Export script
 */

module.exports = babel();

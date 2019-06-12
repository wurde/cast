"use strict";

/**
 * Dependencies
 */

const child_process = require("child_process");
const prompt = require("prompt");
const colors = require("colors");

/**
 * Constants
 */

const config = {
  cwd: process.cwd(),
  stdio: [null, "inherit", "inherit"]
};

/**
 * Define script
 */

function gitcommit() {
  let result = child_process.spawnSync("git", ["add", "-A"], config);

  if (result.status === 0) {
    prompt.briefMessage = "";
    prompt.detailedMessage = "";

    prompt.get(
      [
        {
          name: "briefMessage",
          description: colors.white.bold("Brief Message"),
          required: true
        },
        {
          name: "detailedMessage",
          description: colors.white.bold("Detailed Message"),
          required: true
        }
      ],
      (err, result) => {
        const msg = result.briefMessage || "Save Changes.";
        const longMsg = result.detailedMessage || "Save Changes Successful.";

        child_process.spawnSync(
          "git",
          ["commit", "-m", msg, "-m", longMsg],
          config
        );
      }
    );
  }
}

/**
 * Export script
 */

module.exports = argv => {
  gitcommit();
};

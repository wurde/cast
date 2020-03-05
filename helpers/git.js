const child_process = require("child_process");

function git(args) {
  return child_process.spawnSync("git", args, {
    cwd: process.cwd(),
    stdio: [null, "inherit", "inherit"]
  });
}

module.exports = git;

const child_process = require("child_process");

function npm(args) {
  return child_process.spawnSync("npm", args, {
    cwd: process.cwd(),
    stdio: ["inherit", "inherit", "inherit"]
  });
}

module.exports = npm;

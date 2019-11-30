/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');

/**
 * Define helper
 */

async function applyToFileOrDirectory(fileOrDirectory, fn, options={}) {
  if (!fs.existsSync(fileOrDirectory))
    throw new Error(`cannot find file ${fileOrDirectory}`);

  const stats = fs.statSync(fileOrDirectory);

  if (stats.isDirectory()) {
    const dir = fileOrDirectory;
    const files = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter(file => file.isFile())
      .map(file => path.join(dir, file.name));

    files.forEach(file => fn(file, options));
  } else {
    return await fn(fileOrDirectory, options);
  }
}

/**
 * Define helper
 */

module.exports = applyToFileOrDirectory;

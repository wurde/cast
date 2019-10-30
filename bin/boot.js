#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')

/**
 * Constants
 */

const file_path = path.join('/home/wurde/boot.log')

/**
 * Append new log line
 */

if (!fs.existsSync(file_path)) {
  fs.writeFileSync(file_path, new Date() + '\n')
} else {
  fs.appendFileSync(file_path, new Date() + '\n')
}

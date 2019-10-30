#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const chalk = require('chalk')
const child_process = require('child_process')
const pidof = require('../helpers/pidof')

/**
 * Constants
 */

const bootService = 'boot-scripts.service'
const userBootService = `/lib/systemd/system/${bootService}`
const systemBootService = `/etc/systemd/system/${bootService}`
const bootCode = `
[Unit]
Description=Run /usr/bin/boot

[Service]
ExecStart=/usr/bin/boot
Type=oneshot
RemainAfterExit=no

[Install]
WantedBy=multi-user.target
`.trim()

/**
 * Define setup script
 */

async function main() {
  try {
    /**
     * Check systemd is pid Eins.
     */

    if (!pidof('/sbin/init').includes(pidof('systemd').pop())) {
      throw new Error('Systemd is required')
    }

    /**
     * Hook into system boot sequence.
     */

    if (!fs.existsSync(userBootService)) {
      fs.writeFileSync(userBootService, bootCode)
      fs.symlinkSync(userBootService, systemBootService)
      child_process.execSync('sudo systemctl daemon-reload')
      child_process.execSync(`sudo systemctl enable ${bootService}`)
    }
  } catch (err) {
    console.error('\n', chalk.red.bold(err), '\n')
    process.exit(1)
  }
}

/**
 * Run setup script
 */

main()

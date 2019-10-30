#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const child_process = require('child_process')
const pidof = require('../helpers/pidof')

/**
 * Constants
 */

const userBootService = '/lib/systemd/system/boot-scripts.service'
const systemBootService = '/etc/systemd/system/boot-scripts.service'
const bootCode = `
[Unit]
Description=Run /usr/bin/boot

[Service]
ExecStart=/usr/bin/boot
Type=oneshot
RemainAfterExit=no

[Install]
WantedBy=multi-user.target
`

/**
 * Define setup script
 */

async function main() {
  try {
    /**
     * Check systemd is pid Eins.
     */

    if (pidof('/sbin/init') !== pidof('systemd')) return

    /**
     * Hook into system boot sequence.
     */

    if (!fs.existsSync(userBootService)) {
      await fs.writeFileSync(userBootService, bootCode)
      // TODO link userBootService to systemBootService
      // sudo ln -sf /lib/systemd/system/boot-scripts.service /etc/systemd/system/boot-scripts.service
      // sudo systemctl daemon-reload
      // sudo systemctl enable boot-scripts.service
    }
  } catch (err) {
    console.error('Boot setup skipped.\n')
  }
}

/**
 * Run setup script
 */

main()

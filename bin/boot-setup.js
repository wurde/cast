#!/usr/bin/env node

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const child_process = require('child_process')
const which = require('../helpers/which')

/**
 * Constants
 */

const initBin = '/sbin/init'
const bootBin = '/usr/bin/boot'
const userBootService = '/lib/systemd/system/boot-scripts.service'
const systemBootService = '/etc/systemd/system/boot-scripts.service'
const hasPidof = which('pidof')
const hasSystemd = which('systemd')
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

    if (!hasPidof) return
    if (!hasSystemd) return
    if (!fs.existsSync(initBin)) return
    const initPid = child_process.execSync(`pidof ${initBin}`, { encoding: 'utf8' })
    const systemdPid = child_process.execSync('pidof systemd', { encoding: 'utf8' })
    if (initPid !== systemdPid) return

    /**
     * Hook into system boot sequence.
     */

    if (!fs.existsSync(userBootService)) {
      await fs.writeFileSync(userBootService, bootCode)
    }
  } catch (err) {
    console.error('Boot setup passed.\n')
  }
}

/**
 * Run setup script
 */

main()

/**
 * Dependencies
 */

const fs = require('fs')

/**
 * Hook into the bootup sequence.
 */

fs.appendFileSync('/home/wurde/init.txt', new Date() + '\n')

// https://askubuntu.com/questions/814/how-to-run-scripts-on-start-up


// /etc/systemd/system/foo.service

// [Unit]
// Description=Job that runs the init command.
// 
// [Service]
// ExecStart=/usr/bin/node /home/wurde/Playpen/scripts/bin/init
// Type=oneshot
// RemainAfterExit=no
// 
// [Install]
// WantedBy=multi-user.target

// sudo systemctl daemon-reload
// sudo systemctl enable foo.service

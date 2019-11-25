/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');

/**
 * Constants
 */

const ETC_DIR = '/etc/bash_completion.d';
const COMPSPEC = path.join(ETC_DIR, 'cast');
const CMD = `
_cast() {
  local word
  word="$\{COMP_WORDS[COMP_CWORD]}"

  if [[ "$\{word}" ]]; then
    COMPREPLY=($(cast commands --oneline | tail -n 1 | tr " " "\\n" | grep "^$\{word}" | tr "\\n" " "))
  fi
  return 0
}
complete -F _cast cast
`

/**
 * Require root privileges.
 */

if (process.getuid() !== 0) {
  throw new Error('This server requires root privileges.');
}

/**
 * Write file if dir exists
 */

if (fs.existsSync(ETC_DIR) && !fs.existsSync(COMPSPEC)) {
  fs.writeFileSync(COMPSPEC, CMD);
}

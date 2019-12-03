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
  local cur
  cur="\${COMP_WORDS[COMP_CWORD]}"

  if [[ $COMP_CWORD -gt 1 ]]; then
    COMPREPLY=($(compgen -A file $\{cur}))
  else
    COMPREPLY=($(compgen -W "$(cast commands --oneline | tail -n 1)" $\{cur}))
  fi
  return 0
}
complete -F _cast cast
`;

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

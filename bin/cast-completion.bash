#!/bin/bash

_cast() {
  local word
  word="${COMP_WORDS[COMP_CWORD]}"

  if [[ "${word}" ]]; then
    COMPREPLY=($(cast commands --oneline | tail -n 1 | tr " " "\n" | grep "^${word}" | tr "\n" " "))
  fi
  return 0
}

complete -F _cast cast

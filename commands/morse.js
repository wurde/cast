'use strict'

/**
 * Dependencies
 */

const meow = require('meow');
const chalk = require('chalk');
const beep = require('./beep');
const showHelp = require('../helpers/showHelp');
const sleep = require('../helpers/sleep');

/**
 * Constants
 */

const morse_code = {
  a: [2, 0x01],  // a: .-
  b: [4, 0x08],  // b: -...
  c: [4, 0x0a],  // c: -.-.
  d: [3, 0x04],  // d: -..
  e: [1, 0x00],  // e: .
  f: [4, 0x02],  // f: ..-.
  g: [3, 0x06],  // g: --.
  h: [4, 0x00],  // h: ....
  i: [2, 0x00],  // i: ..
  j: [4, 0x07],  // j: .---
  k: [3, 0x05],  // k: -.-
  l: [4, 0x04],  // l: .-..
  m: [2, 0x03],  // m: --
  n: [2, 0x02],  // n: -.
  o: [3, 0x07],  // o: ---
  p: [4, 0x06],  // p: .--.
  q: [4, 0x0d],  // q: --.-
  r: [3, 0x02],  // r: .-.
  s: [3, 0x00],  // s: ...
  t: [1, 0x01],  // t: -
  u: [3, 0x01],  // u: ..-
  v: [4, 0x01],  // v: ...-
  w: [3, 0x03],  // w: .--
  x: [4, 0x09],  // x: -..-
  y: [4, 0x0b],  // y: -.--
  z: [4, 0x0c],  // z: --..
  "0": [5, 0x1f],  // 0: -----
  "1": [5, 0x0f],  // 1: .----
  "2": [5, 0x07],  // 2: ..---
  "3": [5, 0x03],  // 3: ...--
  "4": [5, 0x01],  // 4: ....-
  "5": [5, 0x00],  // 5: .....
  "6": [5, 0x10],  // 6: -....
  "7": [5, 0x18],  // 7: --...
  "8": [5, 0x1c],  // 8: ---..
  "9": [5, 0x1e],  // 9: ----.
  " ": [0, 0],  // Space
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast morse MESSAGE
`, {
  description: 'Morse code generator.'
});

/**
 * Define script
 */

async function morse(msg) {
  showHelp(cli, [(!msg && cli.input.length < 2)]);

  msg = msg || cli.input.slice(1).join(' ');

  // Filter out unsupported characters.
  msg = msg.replace(/[^a-z0-9 ]/ig, '');

  // Split message by character.
  const chars = msg.split('').map(c => c.toLowerCase());

  // Convert text into morse code.
  const codes = chars.map(char => {
    if (char === ' ') return ' ';

    const length = morse_code[char][0];
    const binary = morse_code[char][1].toString(2);

    const code = binary
      .replace(/0/g, '.')
      .replace(/1/g, '-')
      .padStart(length, '.');

    return code;
  });

  if (arguments.length === 0) {
    // Print to console dit-dot sequence.
    const morse = codes.join(' ');
    console.log('');
    console.log('  ', chalk.white.bold(msg));
    console.log('  ', chalk.green.bold(morse), '\n');
  }

  // Play morse code.
  for (let i = 0; i < codes.length; i++) {
    const c = codes[i].split('');

    for (let j = 0; j < c.length; j++) {
      if (c[j] === '.') {
        await beep(300);
      } else if (c[j] === '-') {
        await beep(600);
      }
    }
    await sleep(1000);
  }

  return codes;
}

/**
 * Export script
 */

module.exports = morse;

'use strict'

/**
 * Dependencies
 */

const fs = require('fs')
const path = require('path')
const meow = require('meow')

/**
 * Constants
 */

const FORMATS = {
  Codes: ['CPP', 'RB', 'PY', 'HTML', 'CSS', 'JS', 'PHP'],
  Compressed: ['RAR', 'JAR', 'ZIP', 'TAR', 'MAR', 'ISO', 'LZ', '7ZIP', 'TGZ', 'GZ', 'BZ2'],
  Documents: ['DOC', 'DOCX', 'PPT', 'PPTX', 'PAGES', 'PDF', 'ODT', 'ODP', 'XLSX', 'XLS', 'ODS', 'TXT', 'IN', 'OUT', 'MD'],
  Executables: ['DEB', 'EXE', 'SH', 'BUNDLE'],
  Images: ['JPG', 'JPEG', 'GIF', 'PNG', 'SVG'],
  Music: ['MP3', 'WAV', 'WMA', 'MKA', 'AAC', 'MID', 'RA', 'RAM', 'RM', 'OGG'],
  Video: ['FLV', 'WMV', 'MOV', 'MP4', 'MPEG', '3GP', 'MKV'],
}
const TYPES = Object.keys(FORMATS)

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast organize
`)

/**
 * Define script
 */

function organize(argv) {
  if (cli.flags.h) cli.showHelp()

  const files = fs.readdirSync('.').filter(file => fs.statSync(file).isFile())

  for (let i = 0; i < files.length; i++) {
    const extension = path.extname(files[i]).replace('.', '').toUpperCase()
    let isMoved = false

    for (let j = 0; j < TYPES.length; j++) {
      if (FORMATS[TYPES[j]].indexOf(extension) >= 0) {
        if (!fs.existsSync(TYPES[j])) fs.mkdirSync(TYPES[j])

        console.log(`Moving file ${files[i]} to ${TYPES[j]}`)
        fs.renameSync(`./${files[i]}`, `./${TYPES[j]}/${files[i]}`)

        isMoved = true
      }
    }

    if (isMoved === false) {
      if (!fs.existsSync('Miscellaneous')) fs.mkdirSync('Miscellaneous')

      console.log(`Moving file ${files[i]} to Miscellaneous`)
      fs.renameSync(`./${files[i]}`, `./Miscellaneous/${files[i]}`)
    }
  }
}

/**
 * Export script
 */

module.exports = organize

'use strict'

/**
 * Dependencies
 */

const fs = require('fs');
const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const highlight = require('cli-highlight').highlight;
const showHelp = require('../helpers/showHelp');

/**
 * Constant
 */

const THEME = {
  /**
   * keyword in a regular Algol-style language
   */
  keyword: chalk.bold.hex('#c678dd'),

  /**
   * mathematical formula in text markup
   */
  formula: chalk.bold.hex('#c678dd'),

  /**
   * built-in or library object (constant, class, function)
   */
  built_in: chalk.bold.hex('#d19a66'),

  /**
   * user-defined type in a language with first-class syntactically significant types, like
   * Haskell
   */
  type: chalk.bold.hex('#d19a66'),

  /**
   * special identifier for a built-in value ("true", "false", "null")
   */
  literal: chalk.bold.hex('#d19a66'),

  /**
   * number, including units and modifiers, if any.
   */
  number: chalk.bold.hex('#d19a66'),

  /**
   * literal regular expression
   */
  regexp: chalk.bold.hex('#98c379'),

  /**
   * literal string, character
   */
  string: chalk.bold.hex('#98c379'),

  /**
   * string within meta construct
   */
  'meta-string': chalk.bold.hex('#98c379'),

  /**
   * added or changed line in a diff
   */
  addition: chalk.bold.hex('#98c379'),

  /**
   * name of an attribute followed by a structured value part, like CSS properties
   */
  attribute: chalk.bold.hex('#98c379'),

  /**
   * symbolic constant, interned string, goto label
   */
  symbol: chalk.bold.hex('#61aeee'),

  /**
   * class or class-level declaration (interfaces, traits, modules, etc)
   */
  class: chalk.bold.hex('#e6c07b'),

  /**
   * function or method declaration
   */
  function: chalk.bold.hex('#c678dd'),

  /**
   * name of a class or a function at the place of declaration
   */
  title: chalk.bold.hex('#61aeee'),

  /**
   * block of function arguments (parameters) at the place of declaration
   */
  params: chalk.bold.hex('#c678dd'),

  /**
   * comment
   */
  comment: chalk.bold.hex('#5c6370'),

  /**
   * documentation markup within comments
   */
  doctag: chalk.bold.hex('#5c6370'),

  /**
   * flags, modifiers, annotations, processing instructions, preprocessor directive, etc
   */
  meta: chalk.bold.hex('#5c6370'),

  /**
   * quotation in text markup
   */
  quote: chalk.bold.hex('#5c6370'),

  /**
   * keyword or built-in within meta construct
   */
  'meta-keyword': chalk.bold.hex('#c678dd'),

  /**
   * XML/HTML tag
   */
  tag: chalk.grey,

  /**
   * name of an XML tag, the first word in an s-expression
   */
  name: chalk.bold.hex('#e6c07b'),

  /**
   * s-expression name from the language standard library
   */
  'builtin-name': chalk.bold.hex('#e6c07b'),

  /**
   * name of an attribute with no language defined semantics (keys in JSON, setting names in
   * .ini), also sub-attribute within another highlighted object, like XML tag
   */
  attr: chalk.cyan,

  /**
   * variable in a config or a template file, environment var expansion in a script
   */
  variable: chalk.bold.hex('#61aeee'),

  /**
   * list item bullet in text markup
   */
  bullet: chalk.bold.hex('#61aeee'),

  /**
   * code block in text markup
   */
  code: chalk.bold.hex('#61aeee'),

  /**
   * emphasis in text markup
   */
  emphasis: chalk.italic,

  /**
   * strong emphasis in text markup
   */
  strong: chalk.bold,

  /**
   * hyperlink in text markup
   */
  link: chalk.bold.hex('#61aeee').underline,

  /**
   * #id selector in CSS
   */
  'selector-id': chalk.bold.hex('#61aeee'),

  /**
   * .class selector in CSS
   */
  'selector-class': chalk.bold.hex('#61aeee'),

  /**
   * [attr] selector in CSS
   */
  'selector-attr': chalk.bold.hex('#61aeee'),

  /**
   * :pseudo selector in CSS
   */
  'selector-pseudo': chalk.bold.hex('#61aeee'),

  /**
   * tag of a template language
   */
  'template-tag': chalk.bold.hex('#e06c75'),

  /**
   * variable in a template language
   */
  'template-variable': chalk.bold.hex('#d19a66'),

  /**
   * heading of a section in a config file, heading in text markup
   */
  section: chalk.bold.hex('#e06c75'),

  /**
   * tag selector in CSS
   */
  'selector-tag': chalk.bold.hex('#e06c75'),

  /**
   * parsed section inside a literal string
   */
  subst: chalk.bold.hex('#e06c75'),

  /**
   * deleted line in a diff
   */
  deletion: chalk.bold.hex('#e06c75'),

  /**
   * things not matched by any token
   */
  default: chalk.bold.hex('#abb2bf')
};

/**
 * Parse args
 */

const cli = meow(`
  Usage
    $ cast cat FILE
`, {
  description: 'Syntax highlighting in your terminal.'
});

/**
 * Define script
 */

function cat(file = null) {
  showHelp(cli, [(!file && cli.input.length < 2)]);

  file = file || cli.input[1];

  if (fs.existsSync(file)) {
    const ext = path.extname(file).replace('.', '');
    const content = fs.readFileSync(file, { encoding: 'utf8' });

    console.log(highlight(content, {
      language: ext,
      ignoreIllegals: true,
      theme: THEME,
    }));
  }
}

/**
 * Export script
 */

module.exports = cat;
